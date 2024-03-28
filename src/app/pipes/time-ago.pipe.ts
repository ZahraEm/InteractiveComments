import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const differenceInSeconds = Math.floor(
        (+new Date() - +new Date(value)) / 1000,
      );
      if (differenceInSeconds < 30) {
        return 'Just now';
      } else if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`;
      } else if (differenceInSeconds < 3600) {
        return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
      } else if (differenceInSeconds < 86400) {
        return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
      } else if (differenceInSeconds < 2629800) {
        return `${Math.floor(differenceInSeconds / 86400)} days ago`;
      } else if (differenceInSeconds < 31557600) {
        return `${Math.floor(differenceInSeconds / 2629800)} months ago`;
      } else {
        return `${Math.floor(differenceInSeconds / 31557600)} years ago`;
      }
    }
    return value;
  }
}
