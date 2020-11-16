using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Ourlife
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .SetIsOriginAllowed((host) => true));
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            //app.UseResponseCompression();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.UseCors(
            //    options => options.WithOrigins("http://localhost:4200").AllowAnyMethod()
            //);



            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            //app.UseCors("AllowAllHeaders");

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                //spa.Options.StartupTimeout = new System.TimeSpan(0, 5, 0);

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
                }
            });
        }
    }
}
