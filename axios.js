let testDiv = document.getElementById("test");
let urlFirstPart = 'http://127.0.0.1:4010/'

function arrFunction(arr) {
  for (let i = 0; i < arr.length; i++) {
    const placeholderText = arr[i].attr("placeholder")
    console.log(placeholderText)
    arr[i].attr("placeholder", arr[i].attr("placeholder"))
    arr[i].addClass('your-class');
  }
}

var str = "* Please Enter "

// company datas get method variables

let companyIdGet = $('#companyId');
let branchIdGet = $('#branchId');
let agentIdGet = $('#agentId');

// company data get method
$("#getBtn").on('click', function () {
  // get one agent
  if (companyIdGet.val() != "" && branchIdGet.val() != "" && agentIdGet.val() != "") {
    getCompanyData(`companies/${companyIdGet.val()}/branches/${branchIdGet.val()}/agents/${agentIdGet.val()}`);

    // get all agents
  } else if ($('#allAgents').is(':checked')) {
    let arr = [companyIdGet, branchIdGet]
    if (arr[0].val() != "" && arr[1].val() != "") {
      getCompanyData(`companies/${arr[0].val()}/branches/${arr[1].val()}/agents`)
    } else {
      arrFunction(arr)
    }

    // get one branch
  } else if (companyIdGet.val() != "" && branchIdGet.val() != "") {
    getCompanyData(`companies/${companyIdGet.val()}/branches/${branchIdGet.val()}`);

    // get all branches
  } else if ($('#allBranches').is(':checked')) {
    let arr = [companyIdGet]
    if (arr[0].val() != "") {
      getCompanyData(`companies/${arr[0].val()}/branches`)
    } else {
      arrFunction(arr)
    }

    // get one company 
  } else if (companyIdGet.val() != "") {
    getCompanyData(`companies/${companyIdGet.val()}`);

    // get al companies
  } else if ($('#allCompanies').is(':checked')) {
    getCompanyData('companies');
  }
})
// axios get fuction for company data
const getCompanyData = (path) => {
  axios.get(urlFirstPart + path).then(response => {
    console.log(urlFirstPart + path)
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
  }).catch(error => {
    console.log(error)
  })
}

// -------------------------------------------------------------------------------------------
// post
// company datas post method variables

let companyIdPost = $('#postCompanyId');
let branchIdPost = $('#postBranchId');
let addtionalData = $('#dataName')
let addtionalDataLabel = $('#dataNameLabelPost')

$("#postBtn").on('click', function () {

  // post new company
  if ($('#agentName').is(':checked')) {
    let arr = [companyIdPost, branchIdPost, addtionalData]
    if (arr[0].val() != "" && arr[1].val() != "" && arr[2].val() != "") {
      postAgentData(`companies/${arr[0].val()}/branches/${arr[1].val()}/agents`, arr[2].val())
    } else {
      arrFunction(arr)
    }

    // post new branch
  } else if ($('#branchName').is(':checked')) {
    let arr = [companyIdPost, addtionalData]
    if (arr[0].val() != "" && arr[1].val() != "") {
      postCompanyData(`companies/${arr[0].val()}/branches`, arr[1].val())
    } else {
      arrFunction(arr)
    }

    // post new agent
  } else if ($('#companyName').is(':checked')) {
    let arr = [addtionalData]
    if (arr[0].val() != "") {
      postCompanyData('companies', arr[0].val())
    } else {
      arrFunction(arr)
    }
  }
})

const postCompanyData = (path, postedName) => {
  axios.post(urlFirstPart + path, {
    name: postedName
  }).then(response => {
    // console.log(response)
    // console.log(response.data)
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
    let neededId = JSON.stringify(response.data.id, null, "\t")
    companyBranch(neededId)
    // console.log(urlFirstPart + path)
  }).catch(error => {
    console.log(error)
  })
}
function companyBranch (neededId){
  if ($('#branchName').is(':checked')) {
    companyIdPost.val() = neededId
    let arr = [addtionalData]
    if (arr[1].val() != "") {
      postCompanyData(`companies/${neededId}/branches`, arr[1].val())
    } else {
      arrFunction(arr)
    }
  }
}

const postAgentData = (path, userId) => {
  axios.post(urlFirstPart + path, {
    user_id: userId
  }).then(response => {  
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
    }).catch(error => {
    console.log(error)
  })
}

// put ---------------------------------------------------------------------------------------------

let companyIdPut = $('#putCompanyId');
let branchIdPut = $('#putBranchId');
let agentIdPut = $('#putAgentId');
let addtionalDataPut = $('#putDataName');
let deactivated = $('#putBranchData');

$("#putBtn").on('click', function () {
  if ($('#changeComp').is(':checked')) {
    var arr = [companyIdPut, addtionalDataPut]
    if (arr[0].val() != "" && arr[1].val() != "") {
      putCompanyData(`companies/${arr[0].val()}`, arr[1].val())
    } else {
      arrFunction(arr)
    }

  } else if ($('#changeBranch').is(':checked')) {
    var arr = [companyIdPut, branchIdPut, addtionalDataPut, deactivated]
    if (arr[0].val() != "" && arr[1].val() != "" && arr[2].val() != "" && arr[3].val() != "") {
      putBranchData(`companies/${arr[0].val()}/branches/${arr[1].val()}`, arr[2], arr[3])
    } else {
      arrFunction(arr)
    }

  } else if ($('#changeAgent').is(':checked')) {
    var arr = [companyIdPut, branchIdPut, agentIdPut, addtionalDataPut]
    if (arr[0].val() != "" && arr[1].val() != "" && arr[2].val() != "" && arr[3].val() != "") {
      putAgentData(`companies/${arr[0].val()}/branches/${arr[1].val()}/agents/${arr[2].val()}`, arr[3].val())

    } else {
      arrFunction(arr)
    }
  }
})

const putCompanyData = (path, postedName) => {
  axios.put(urlFirstPart + path, {
    name: postedName
  }).then(response => {
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
    console.log(urlFirstPart + path)
  }).catch(error => {
    console.log(error)
  })
}

const putAgentData = (path, sendeId) => {
  axios.put(urlFirstPart + path, {
    user_id: sendeId
  }).then(response => {
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
    console.log(urlFirstPart + path)
  }).catch(error => {
    console.log(error)
  })
}
const putBranchData = (path, dataName, deactiveData) => {
  axios.put(urlFirstPart + path, {
    deactivated: deactiveData,
    name: dataName
  }).then(response => {
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
    console.log(urlFirstPart + path)
  }).catch(error => {
    console.log(error)
  })
}



// Lenders ---------------------------------------------------------------------------------------------------------------------
// get methods
let lenderIdGet = $("#lenderIdGet")
let lenderIdLabelGet = $("#lenderIdGetLabel")

let opTypesIdGet = $("#opTypesIdGet")
let conditionsIdGet = $("#conditionsIdGet")
let opIdGet = $("#opIdGet")
lenderIdLabelGet.css("display", "none")
$("#getLenderBtn").on('click', function () {

  // get all lenders
  if ($('#allLenders').is(':checked')) {
    getLendersData('lenders')

    // get one lender
  } else if (lenderIdGet.val() != "") {
    getLendersData(`lenders/${lenderIdGet.val()}`)

    // get all operation-types
  } else if ($('#allOpTypes').is(':checked')) {
    getLendersData(`lenders/operation-types`)

    // get one operation-type
  } else if (opTypesIdGet.val() != "") {
    getLendersData(`lenders/operation-types/${opTypesIdGet.val()}`)

    // get all operation/conditions
  } else if ($('#allConditions').is(':checked')) {
    getLendersData(`lenders/operations/conditions`)

    // get one condition
  } else if (conditionsIdGet.val() != "") {
    getLendersData(`lenders/operations/conditions/${conditionsIdGet.val()}`)

    // get all operations
  } else if ($('#allOp').is(':checked')) {
    if (lenderIdGet.val() != "") {
      getLendersData(`lenders/${lenderIdGet.val()}/operations`)
      lenderIdLabelGet.css("display", "none")

    } else {
      lenderIdLabelGet.css("display", "block")
    }
    // get one operation
  } else if (opIdGet.val() != "") {
    if (lenderIdGet.val() != "") {
      getLendersData(`lenders/${lenderIdGet.val()}/operations/${opIdGet.val()}`)
      lenderIdLabelGet.css("display", "none")

    } else {
      lenderIdLabelGet.css("display", "block")
    }
  }
})


const getLendersData = (path) => {

  axios.get(urlFirstPart + path).then(response => {
    console.log(urlFirstPart + path)
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
  }).catch(error => {
    console.log(error)
  })
}


let lenderNameValue = $('#lenderNameValue') 
let conditionValue = $('#postConditiondatas')
$("#postLenderBtn").on('click', function () {
      // post new lender
  if ($('#lenderName').is(':checked')) {
    let arr = [lenderNameValue]
    if (lenderNameValue.val() != "" ) {
      postLenderData(`lenders`, arr[0].val())
    } else {
      arrFunction(arr)
    }
  }
  if ($('#opTypesPost').is(':checked')) {
    let arr = [lenderNameValue]
    if (lenderNameValue.val() != "" ) {
      postLenderData(`lenders/operation-types`, arr[0].val())
    } else {
      arrFunction(arr)
    }
  }

  if ($('#condtionPost').is(':checked')) {
    let arr = [conditionValue]
    // conditionValue.css('width', '570px');

    if (conditionValue.val() != "" ) {
      let conditionArr = conditionValue.val().split(",")
      console.log(conditionArr)
      postLenderData(`lenders/operations/conditions`, arr[0].val())
    } else {
      arrFunction(arr)
    }
  }
  //   // post new branch
  // } else if ($('#branchName').is(':checked')) {
  //   let arr = [companyIdPost, addtionalData]
  //   if (arr[0].val() != "" && arr[1].val() != "") {
  //     postCompanyData(`companies/${arr[0].val()}/branches`, arr[1].val())
  //   } else {
  //     arrFunction(arr)
  //   }

  //   // post new agent
  // } else if ($('#companyName').is(':checked')) {
  //   let arr = [addtionalData]
  //   if (arr[0].val() != "") {
  //     postlenderData('companies', arr[0].val())
  //   } else {
  //     arrFunction(arr)
  //   }
  // }
})

const postLenderData = (path, postedName) => {
  axios.post(urlFirstPart + path, {
    name: postedName
  }).then(response => {
    console.log(response)
    console.log(response.data)
    testDiv.innerText = JSON.stringify(response.data, null, "\t")
    let neededId = JSON.stringify(response.data.id, null, "\t")
    console.log(urlFirstPart + path)
  }).catch(error => {
    console.log(error)
  })
}
// function companyBranch (neededId){
//   if ($('#branchName').is(':checked')) {
//     companyIdPost.val() = neededId
//     let arr = [addtionalData]
//     if (arr[1].val() != "") {
//       postCompanyData(`companies/${neededId}/branches`, arr[1].val())
//     } else {
//       arrFunction(arr)
//     }
//   }
// }

// const postAgentData = (path, userId) => {
//   axios.post(urlFirstPart + path, {
//     user_id: userId
//   }).then(response => {
//     // console.log(response)
//     // console.log(response.data)
//     testDiv.innerText = JSON.stringify(response.data, null, "\t")
//     // console.log(urlFirstPart + path)
//   }).catch(error => {
//     console.log(error)
//   })
// }



// $('#condtionPost').change(function () {
//   console.log("aaaa")

//  if ($('#condtionPost').is(':checked')) {
//   conditionValue.width('570px');
//   console.log("aaaa")
// }else {
//   conditionValue.width('388px');
//   console.log("bbb")

// }

// });
