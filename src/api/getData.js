import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/member/login', data, 'GET');

/**
 * 退出
 */

export const signout = () => fetch('/admin/singout');


/**
 * 查询所有医生接口
 */

export const getDoctorSelectAllDoctor = () => fetch('/doctor/selectAllDoctor');


/**
 * 添加医生
 */
export const fetchAddDoctor = data => fetch('/doctor/addDoctor', data, 'POST');

/**
 * 删除医生信息
 */
export const fetchDeleteDoctor = data => fetch('/doctor/deleteDoctor', data,'GET');

/**
 * 获取所有医生列表
 */
export const getDoctorList = data => fetch('/doctor/selectAllDoctor');

/**
 * 根据条件查询医生分页信息
 */
export const getFindDoctorByCondition = data => fetch('/doctor/findDoctorByCondition',data,'POST');


