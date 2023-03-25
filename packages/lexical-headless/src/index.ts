/** @module @lexical/headless */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {CreateEditorArgs, LexicalEditor} from 'lexical';

import {createEditor} from 'lexical';
import {LexicalHeadlessFrontendAdapter} from 'packages/lexical/src/LexicalHeadlessFrontendAdapter';

export function createHeadlessEditor(
  editorConfig?: CreateEditorArgs,
): LexicalEditor {
  const config = editorConfig || {};
  config.frontendAdapter = new LexicalHeadlessFrontendAdapter();
  const editor = createEditor(config);

  const unsupportedMethods = [
    'registerDecoratorListener',
    'registerRootListener',
    'registerMutationListener',
    'getRootElement',
    'setRootElement',
    'getElementByKey',
    'focus',
    'blur',
  ] as const;

  unsupportedMethods.forEach((method: typeof unsupportedMethods[number]) => {
    editor[method] = () => {
      throw new Error(`${method} is not supported in headless mode`);
    };
  });

  return editor;
}
