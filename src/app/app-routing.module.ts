import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', component: HomeComponent },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'social', loadChildren: () => import('./social/social.module').then(m => m.SocialModule) },
  { path: 'resume', loadChildren: () => import('./resume/resume.module').then(m => m.ResumeModule) },
  { path: 'chat', loadChildren: () => import('./chatbot/chatbot.module').then(m => m.ChatbotModule) },
  { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },

  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
