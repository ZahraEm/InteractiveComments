import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomInputNumberComponent } from '../../components/custom-input-number/custom-input-number.component';
import { Comment, responseBoxType } from '../../models/comments.models';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { CommentComponent } from '../../components/comment/comment.component';
import { ResponseBoxComponent } from '../../components/response-box/response-box.component';

@Component({
  selector: 'app-comments-page',
  standalone: true,
  imports: [
    FormsModule,
    CustomInputNumberComponent,
    TimeAgoPipe,
    CommentComponent,
    ResponseBoxComponent,
  ],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.scss',
})
export class CommentsPageComponent implements OnInit {
  comments!: Comment[];
  RESPONSE_BOX_TYPE = responseBoxType;
  isUserAvatar = '../../../assets/images/avatars/image-juliusomo.png';
  ngOnInit(): void {
    this.comments = [
      {
        id: '1',
        username: 'amyrobson',
        avatar: '../../../assets/images/avatars/image-amyrobson.png',
        date: new Date('2023-01-22T20:30:00.000Z'),
        message:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        rate: 12,
        responses: [],
        isUser: false,
      },
      {
        id: '2',
        username: 'maxblagun',
        avatar: '../../../assets/images/avatars/image-maxblagun.png',
        date: new Date('2023-01-22T20:30:00.000Z'),
        message:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        rate: 5,
        responses: [
          {
            id: '3',
            username: 'ramsesmiron',
            avatar: '../../../assets/images/avatars/image-ramsesmiron.png',
            date: new Date('2023-01-22T20:30:00.000Z'),
            message:
              "@maxblagun If you're still new. I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            rate: 4,
            responses: [],
            isUser: false,
          },
          {
            id: '3',
            username: 'juliusomo',
            avatar: '../../../assets/images/avatars/image-juliusomo.png',
            date: new Date('2023-01-22T20:30:00.000Z'),
            message:
              "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant. ",
            rate: 2,
            responses: [],
            isUser: true,
          },
        ],
        isUser: false,
      },
    ];
  }
  myValue: number = 0;

  onValueChange(value: number) {
    console.log('Value changed to:', value);
  }
}
