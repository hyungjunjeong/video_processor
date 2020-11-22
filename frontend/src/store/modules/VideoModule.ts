import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({ namespaced: true, name: "VideoModule" })
export default class VideoModule extends VuexModule {
  public file: File | null = null;
  public showPlayer = false;

  @Mutation
  public setFileinfo(file: File | null): void {
    this.file = file;
  }

  @Mutation
  public setPlayerVisibility(show: boolean): void {
    this.showPlayer = show;
  }

  get getFile(): File | null {
    return this.file;
  }

  get getShowPlayer(): boolean {
    return this.showPlayer;
  }
}
