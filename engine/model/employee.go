package model

type Employee struct {
	UserID            string `json:"userId"`
	PersonID          string `json:"personId"`
	EmpID             string `json:"empId"`
	Gender            string `json:"gender"`
	FirstNameEn       string `json:"firstNameEn"`
	LastNameEN        string `json:"lastNameEN"`
	FirstName         string `json:"firstName"`
	LastName          string `json:"lastName"`
	PreferredNameEn   string `json:"preferredNameEn"`
	UserName          string `json:"userName"`
	Email             string `json:"email"`
	HiredDate         string `json:"hiredDate"`
	ResignDate        string `json:"resignDate"`
	PositionCode      string `json:"positionCode"`
	JobTitle          string `json:"jobTitle"`
	ManagerID         string `json:"managerID"`
	CompanyCode       string `json:"companyCode"`
	BusinessUnitCode  string `json:"businessUnitCode"`
	FunctionCode      string `json:"functionCode"`
	SubFunction1Code  string `json:"subFunction1Code"`
	SubFunction2Code  string `json:"subFunction2Code"`
	SubFunction3Code  string `json:"subFunction3Code"`
	SubFunction4Code  string `json:"subFunction4Code"`
	SubFunction5Code  string `json:"subFunction5Code"`
	SubFunction6Code  string `json:"subFunction6Code"`
	SubFunction7Code  string `json:"subFunction7Code"`
	WorkingLocation   string `json:"workingLocation"`
	Country           string `json:"country"`
	OfficePhone       string `json:"officePhone"`
	IpPhone           string `json:"ipPhone"`
	Status            any    `json:"status"`
	DateOfBirth       string `json:"dateOfBirth"`
	CostCenter        string `json:"costCenter"`
	JobLevel          string `json:"jobLevel"`
	MultipleJob       string `json:"multipleJob"`
	JobLevelDoa       string `json:"jobLevelDoa"`
	JobLevelDoaNew    string `json:"jobLevelDoaNew"`
	JobStatus         string `json:"jobStatus"`
	JobLevelModel     Master `json:"jobLevelModel"`
	Manager           Master `json:"manager"`
	CompanyModel      Master `json:"companyModel"`
	BusinessUnitModel Master `json:"businessUnitModel"`
	FunctionModel     Master `json:"functionModel"`
	SubFunction1Model Master `json:"subFunction1Model"`
	SubFunction2Model Master `json:"subFunction2Model"`
	SubFunction3Model Master `json:"subFunction3Model"`
	SubFunction4Model Master `json:"subFunction4Model"`
	SubFunction5Model Master `json:"subFunction5Model"`
	SubFunction6Model Master `json:"subFunction6Model"`
	SubFunction7Model Master `json:"subFunction7Model"`
}

type Master struct {
	Code   string `json:"code"`
	Name   string `json:"name"`
	Status bool   `json:"status"`
}
