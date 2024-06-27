const message = {
    NoPermission: () => "Tài khoản của bạn không được cấp quyền!",
    invalidUserName: (value: any) => `${value} không phải là tên người dùng hợp lệ. Tên người dùng chỉ chứa các chữ cái và số!`,
    invalidEmail: (value: any) => `${value} không phải là email hợp lệ!`,
    invalidPhoneNumber: (value: any) => `${value} không phải là số điện thoại hợp lệ!`,
    invalidFullname: (value: any) => `${value} tên không hợp lệ!`,
    invalidIdentification: (value: any) => `${value} số CMND/CCCD không hợp lệ!`,
    invalidInsurance: (value: any) => `${value} số bảo hiểm y tế!`,
    invalidDateOfBirth: () => `Ngày sinh không hợp lệ, phải là định dạng MM/dd/YYYY`
}

export default message;