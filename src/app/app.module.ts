import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TextSeletionDirective } from './directives/text-seletion.directive';
import { TabOutputComponent } from './tabs/tab-output/tab-output.component';
import { TabAddRelationComponent } from './tabs/tab-add-relation/tab-add-relation.component';
import { TabSentenceComponent } from './tabs/tab-sentence/tab-sentence.component';
import { TabRelationComponent } from './tabs/tab-relation/tab-relation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TabSentenceComponent,
    TabRelationComponent,
    TabAddRelationComponent,
    TabOutputComponent,
    TextSeletionDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
