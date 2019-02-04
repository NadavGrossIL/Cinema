import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "onlyEnglish"
})
export class onlyEnglishPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[^\w\s]/gi, "");
  }
}
