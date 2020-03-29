import { parseDate } from './global.js';
/**
 * @param  {...HTMLInputElement} inputs 
 */
export function resetCustomValidity(...inputs) {
  inputs.forEach(input => input.setCustomValidity(''));
}

/**
 * @param  {...HTMLInputElement} inputs 
 */
export function setValidityMessage(...inputs) {
  inputs.forEach((input) => {
    document.querySelector(`#${input.id} ~ .invalid-feedback`).textContent = getErrorMessege(input);
  });
}

/**
 * @param {HTMLInputElement} input 
 * @returns {string}
 */
function getErrorMessege(input) {
  if (input.validity.customError) {
    return input.validationMessage;
  } else if (input.validity.valueMissing) {
    return 'このフィールドを入力してください。';
  } else if (input.validity.typeMismatch) {
    if (input.type === 'email') {
      return 'メールアドレスを入力してください。';
    } else if (input.type === 'url') {
      return 'URLを入力してください。';
    } else {
      return '有効な値を入力してください。';
    }
  } else if (input.validity.badInput) {
    return '有効な値を入力してください。';
  } else if (input.validity.patternMismatch) {
    return '指定されている形式で入力してください。';
  } else if (input.validity.tooLong) {
    return `${input.maxLength}文字以内で入力してください。`;
  } else if (input.validity.tooShort) {
    return `${input.minLength}文字以上で入力してください。`;
  } else if (input.validity.rangeOverflow) {
    return `${input.max}以下の値を入力してください。`;
  } else if (input.validity.rangeUnderflow) {
    return `${input.min}以上の値を入力してください。`;
  } else if (input.validity.stepMismatch) {
    return '有効な値を入力してください。';
  }
}

/**
 * @param {string} value
 * @returns {string} 
 */
export function validateDateInput(value) {
  const date = parseDate(value);
  if (!date) {
    return '有効な値を入力してください。';
  } else {
    const now = new Date();
    const after90 = new Date();
    after90.setDate(after90.getDate() + 90);
    if (date.getTime() < now.getTime()) {
      return '翌日以降の日付を入力してください。';
    } else if (date.getTime() > after90.getTime()) {
      return '3ヶ月以内の日付を入力してください。';
    }
  }
}
