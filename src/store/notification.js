import { dellAxios, getAxios, postAxios } from '../utils/axios'

const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
const SET_ICON_URL = 'SET_ICON_URL'
const DELL_NOTIFICATION = 'DELL_NOTIFICATION'
const IS_CREATE_NOTIFICATION = 'IS_CREATE_NOTIFICATION'
const IS_ICON_UPLOAD = 'IS_ICON_UPLOAD'
const LOADING_NOTIFICATIONS = 'LOADING_NOTIFICATIONS'
const LOADING_ICON = 'LOADING_ICON'
const LOADING_DETAILS_NOTIFICATION = 'LOADING_DETAILS_NOTIFICATION'
const GET_DATE_PICKER = 'GET_DATE_PICKER'

const URL = process.env.REACT_APP_URL

export const getAllNotifications =
	(page, pageSize, startDate, endDate) => async (dispatch) => {
		dispatch(loadingNotifications(true))
		const url =
			page && pageSize && startDate && endDate
				? `${URL}/admin/property/notifications?page=${page}&limit=${pageSize}&start=${startDate}&end=${endDate}`
				: page && pageSize
				? `${URL}/admin/property/notifications?page=${page}&limit=${pageSize}`
				: `${URL}/admin/property/notifications?page=1&limit=30`
		const response = await getAxios(url, dispatch)
		dispatch(getNotifications(response.data))
		dispatch(isCreateNotification(false))
		dispatch(loadingNotifications(false))
		dispatch(deleteNotification(false))
		dispatch(setIconURL('undefined'))
	}

export const sendIcon = (icon) => async (dispatch) => {
	const url = `${URL}/admin/property/notification/images`
	dispatch(loadIcon(true))
	const data = new FormData()
	data.append('file', icon)
	const response = await postAxios(url, data, dispatch)
	dispatch(setIconURL(response.data))
	dispatch(isIconUpload(true))
	dispatch(loadIcon(false))
}

export const createNotification = (data) => async (dispatch) => {
	dispatch(loadingNotifications(true))
	const url = `${URL}/admin/property/notifications`
	await postAxios(url, data, dispatch)
	dispatch(isCreateNotification(true))
	dispatch(loadingNotifications(false))
}

export const dellNotification = (id) => async (dispatch) => {
	dispatch(loadingNotifications(true))
	const url = `${URL}/admin/property/notification${id}`
	await dellAxios(url, dispatch)
	dispatch(deleteNotification(true))
	dispatch(loadingNotifications(false))
}

const loadingNotifications = (boolean) => ({
	type: LOADING_NOTIFICATIONS,
	payload: boolean,
})

export const loadIcon = (boolean) => ({
	type: LOADING_ICON,
	payload: boolean,
})

const setIconURL = (url) => ({
	type: SET_ICON_URL,
	payload: url,
})

const getNotifications = (service) => ({
	type: GET_NOTIFICATIONS,
	payload: service,
})

const deleteNotification = (deleteService) => ({
	type: DELL_NOTIFICATION,
	payload: deleteService,
})

const isCreateNotification = (isCreateService) => ({
	type: IS_CREATE_NOTIFICATION,
	payload: isCreateService,
})

const isIconUpload = (boolean) => ({
	type: IS_ICON_UPLOAD,
	payload: boolean,
})

export const getDatePicker = (date) => ({
	type: GET_DATE_PICKER,
	payload: date,
})

const InitialState = {
	notifications: '',
	iconUrl: '',
	deleteNotification: false,
	isCreateNotification: false,
	loading: false,
	loadingIcon: false,
	isIconUpload: false,
	datePicker: null,
}

export const notificationReducer = (state = InitialState, action) => {
	switch (action.type) {
		case GET_NOTIFICATIONS:
			return { ...state, notifications: action.payload, loading: false }
		case SET_ICON_URL:
			return { ...state, iconUrl: action.payload, loading: false }
		case DELL_NOTIFICATION:
			return { ...state, deleteNotification: action.payload, loading: false }
		case IS_CREATE_NOTIFICATION:
			return { ...state, isCreateNotification: action.payload, loading: false }
		case IS_ICON_UPLOAD:
			return { ...state, isIconUpload: action.payload, loading: false }
		case LOADING_NOTIFICATIONS:
			return { ...state, loading: action.payload }
		case LOADING_ICON:
			return { ...state, loadingIcon: action.payload }
		case LOADING_DETAILS_NOTIFICATION:
			return { ...state, loadingDetails: action.payload }
		case GET_DATE_PICKER:
			return { ...state, datePicker: action.payload }
		default:
			return state
	}
}
