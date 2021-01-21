using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using System;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", System.IO.Path.Combine(env.ContentRootPath, "firebase.key.json"));
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder => builder.WithOrigins("http://localhost:4200", "http://t4vn.com")
                    .AllowCredentials()
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                );
            });

            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = true;
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[] { "image/svg+xml" });
            });
            services.AddAntiforgery(options => { options.Cookie.HttpOnly = false; options.HeaderName = "X-XSRF-TOKEN"; });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                //configuration.RootPath = "ClientApp/dist";
                configuration.RootPath = "ClientApp/dist/ClientApp/browser";
            });
            services.AddResponseCaching(options =>
            {
                options.SizeLimit = long.MaxValue;
                options.MaximumBodySize = long.MaxValue;
            });
            services.AddMemoryCache();
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
            });
            services.AddHttpsRedirection(options =>
            {
                options.HttpsPort = 443;
            });
            services.AddMvc(options =>
            {
                options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IAntiforgery antiforgery)
        {
            if (false && env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler((Action<IApplicationBuilder>)(options =>
                {
                    options.Run((RequestDelegate)(async (context) =>
                    {
                        var error = new Models.ExceptionHandlerModel((HttpContext)context);
                        context.Response.StatusCode = error.RequestStatusCode;
                        await context.Response.WriteAsync(error.RequestInformation);
                        //context.Response.Redirect("/");
                        //await Task.CompletedTask.ConfigureAwait(false);
                    }));
                }));
                //app.UseHsts();
                //app.UseHttpsRedirection();
            }

            app.UseCors();


            app.UseResponseCaching();
            app.UseResponseCompression();

            app.Use(next => context =>
            {
                string path = context.Request.Path.Value;
                if (path != null && !path.ToLower().Contains("/api"))
                {
                    Commons.ConstFuncs.SetResponseHeader(context.Response);
                    SetHeaderCookie(context, antiforgery);
                }
                return next(context);
            });

            app.UseStaticFiles(StaticFileOptions(antiforgery));
            app.UseSpaStaticFiles(StaticFileOptions(antiforgery));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action=Index}/{id?}");
            });
            //app.UseCors("AllowAllHeaders");

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                spa.UseSpaPrerendering(options =>
                {
                    // This is the path where angular generates the server build result
                    // This path would be different when using React or Vue
                    options.BootModulePath = $"{spa.Options.SourcePath}/dist/ClientApp/server/main.js";

                    // During development, let angular run the build:ssr command on each build.
                    // Check the package.json to see what this command does.
                    // When deploying your application on a production server, the ng build:ssr command will be executed to generate the server build.
                    // Check the csproj file to see what commands are being run on publish.
                    // The PublishRunWebpack target runs `npm install` `npm run build -- --prod` and `npm run build:ssr`
                    //options.BootModuleBuilder = env.IsDevelopment()
                    //    ? new AngularCliBuilder(npmScript: "build:ssr")
                    //    : null;
                    options.BootModuleBuilder = null;

                    options.ExcludeUrls = new[] { "/sockjs-node" };
                });

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");

                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = System.TimeSpan.FromSeconds(80);
                }
            });
        }

        private StaticFileOptions StaticFileOptions(IAntiforgery antiforgery)
        {
            return new StaticFileOptions
            {
                ServeUnknownFileTypes = true,
                OnPrepareResponse = ctx =>
                {
                    Commons.ConstFuncs.SetResponseHeader(ctx.Context.Response);
                }
            };
        }

        private void SetHeaderCookie(HttpContext context, IAntiforgery antiforgery)
        {
            AntiforgeryTokenSet tokens = antiforgery.GetAndStoreTokens(context);
            context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false, Path = "/", });
        }
    }
}
