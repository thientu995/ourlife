import { SafeHtmlPipe, SafeUrlPipe } from './safe-html.pipe';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [SafeHtmlPipe, SafeUrlPipe],
  exports: [SafeHtmlPipe, SafeUrlPipe],
  imports: []
})
export class PipesModule { }
