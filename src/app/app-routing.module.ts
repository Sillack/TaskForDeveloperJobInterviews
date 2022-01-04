import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from "./post-component/post.component";
import {PostDetailsComponent} from "./post-details-component/post-details.component";

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    children: [
      {path: '', component: PostComponent},
      {
        path: ':id',
        children:
          [
            {
              path: '',
              component: PostDetailsComponent,
            },
          ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
