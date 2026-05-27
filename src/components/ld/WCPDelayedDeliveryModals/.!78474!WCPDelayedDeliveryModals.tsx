import * as React from 'react';
import {cx} from '../common';
import { useState, useEffect } from "react";
import { Button } from '../Button';
import { Alert } from '../Alert';
import { WCPDemoModalRaw } from '../WCPDemoModal';
import './WCPDelayedDeliveryModals.css';

export type DelayedModalType = "reschedule" | "pickupInstead" | "viewDetails" | "cancel" | null;

interface DelayedDeliveryModalsProps {
  openModal: DelayedModalType;
  onClose: () => void;
  orderTotal?: string;
}

