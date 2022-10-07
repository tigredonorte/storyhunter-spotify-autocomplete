import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) {
      return '';
    }
    return this.formatDuration(value);
  }

  private formatDuration = (durationMs: string): string => {
    const d = new Date(Date.UTC(0,0,0,0,0,0,parseInt(durationMs)));
    const parts = [
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    ];
    return parts.map(s => String(s).padStart(2,'0')).join(':');
  }
}
