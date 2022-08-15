/* eslint-disable indent */
import { uploadHandler } from 'utils/uploadData';
import { CustomButtonHtmlElement } from './custom-button';
import { NewPrompt } from './self-destruct-prompt';

export class UploadButtonHtmlElement extends CustomButtonHtmlElement {
  constructor() {
    super();

    this.onClickFn = async () => {
      const res = await uploadHandler();

      const promptContainer = this.parentElement;
      if (res.success) {
        NewPrompt(
          promptContainer,
          'Game successfully saved - see you on the leaderboard!',
          'mediumseagreen'
        );
      } else {
        NewPrompt(promptContainer, res.errorMessage, 'red');
      }
    };
  }
}
