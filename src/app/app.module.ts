import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgJsonEditorModule } from 'ang-jsoneditor';



import { ToastrModule } from 'ngx-toastr';
import { FileSaverModule } from 'ngx-filesaver';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TextSeletionDirective } from './directives/text-seletion.directive';
import { TabOutputComponent } from './tabs/tab-output/tab-output.component';
import { TabAddRelationComponent } from './tabs/tab-add-relation/tab-add-relation.component';
import { TabSentenceComponent } from './tabs/tab-sentence/tab-sentence.component';
import { TabRelationComponent } from './tabs/tab-relation/tab-relation.component';
import { RelationFilterPipe } from './pipes/relation-filter.pipe';
import { TabDemoComponent } from './tabs/tab-demo/tab-demo.component';
import { TabSamplesComponent } from './tabs/tab-samples/tab-samples.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TabSentenceComponent,
    TabRelationComponent,
    TabAddRelationComponent,
    TabOutputComponent,
    TextSeletionDirective,
    RelationFilterPipe,
    TabDemoComponent,
    TabSamplesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgJsonEditorModule,
    FileSaverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
