/**
 * slice para checkoutSlice
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiService } from '../../services'
import { config } from '../../config'

const urlEndpointSession = 'apps/payments/create-checkout-session/'

//agregando este Thunk para session
export const createCheckoutSession = createAsyncThunk(
  "checkout/createCheckoutSession",
  async (order_id, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `${config.appURLcore}${urlEndpointSession}`,
        //esta ulr es igual a = http://localhost:8080/core/api/v1/apps/payments/create-checkout-session/
        { order_id }
      );

      return response.body;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear sesion de pago");
    }
  }
);

const initialShipping = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  method: 'standard',
}

const initialPayment = {
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
}

const initialState = {
  step: 1,
  shipping: initialShipping,
  payment: initialPayment,
  pendingOrderId: null,
  checkoutUrl: null,
  paymentLoading: false,
  paymentError: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    //
    nextStep: (state) => {
      if (state.step < 2) state.step += 1
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1
    },
    updateShipping: (state, action) => {
      state.shipping = { ...state.shipping, ...action.payload }
    },
    updatePayment: (state, action) => {
      state.payment = { ...state.payment, ...action.payload }
    },
    setPendingOrderId: (state, action) => {
      state.pendingOrderId = action.payload
    },
    resetCheckout: (state) => {
      state.step = 1
      state.shipping = initialShipping
      state.payment = initialPayment
      state.pendingOrderId = null
    },
  },
  extraReducers: (builder) => {
    builder
    //case para session de pagos
    .addCase(createCheckoutSession.pending, (state) => {
      state.paymentLoading = true;
      state.paymentError = null;
    })
    .addCase(createCheckoutSession.fulfilled, (state, action) => {
      state.paymentLoading = false;
      state.checkoutUrl = action.payload.checkout_url;
    })
    .addCase(createCheckoutSession.rejected, (state, action) => {
      state.paymentLoading = false;
      state.paymentError = action.payload;
    })
  }
})

export const { nextStep, prevStep, updateShipping, updatePayment, setPendingOrderId, resetCheckout } =
  checkoutSlice.actions

export const selectStep           = (state) => state.checkout.step
export const selectShipping       = (state) => state.checkout.shipping
export const selectPayment        = (state) => state.checkout.payment
export const selectPendingOrderId = (state) => state.checkout.pendingOrderId

// para sesions
export const selectCheckoutUrl = (state) => state.checkout.checkoutUrl;
export const selectPaymentLoading = (state) => state.checkout.paymentLoading;
export const selectPaymentError = (state) => state.checkout.paymentError;

export default checkoutSlice.reducer
