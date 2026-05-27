'use client';

import * as React from 'react';
import {cx, useStableId, applyCommonProps} from '../common';
import './Spinner.css';
export type SpinnerColor = 'neutral' | 'white';

export type SpinnerSize = 'large' | 'small';

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  /**
   * The accessible label for the spinner.
   *
