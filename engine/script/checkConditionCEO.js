const checkConditionCEO = (requester) => {
  if (["1", "260"].includes(requester.profile.userID)) {
    const userProfile = getUserProfileByUserId(requester.profile.userID);
    requester.finalApprovers = empToFinalApprover(userProfile, "Approver");
    requester.overidingTasks["MANAGEMENT_AS_REQUESTER_CORRECTION"] = true;
  }

  return requester;
};

const empToFinalApprover = (emp, role) => {
  return [
    {
      userID: emp.userID,
      jobLevelDOA: emp.jobLevelDOA,
      role: role,
      approver: [emp],
      remark: ""
    },
  ];
};
