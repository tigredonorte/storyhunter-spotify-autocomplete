import { DurationPipe } from './track.pipe';

describe('TrackPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });
});
