// dropdown company
$("#getRow").on('click', function () {
    let getDivDisplay = $(".getDiv").css("display")
    if( getDivDisplay === "none" ){
      $(".getDiv").css("display","flex")
  
    } else {
      $(".getDiv").css("display","none")
    }
  })

  $("#postRow").on('click', function () {
    let getDivDisplay = $(".postDiv").css("display")
    if( getDivDisplay === "none" ){
      $(".postDiv").css("display","flex")
  
    } else {
      $(".postDiv").css("display","none")
    }
  })
  $("#putRow").on('click', function () {
    let getDivDisplay = $(".putDiv").css("display")
    if( getDivDisplay === "none" ){
      $(".putDiv").css("display","flex")
  
    } else {
      $(".putDiv").css("display","none")
    }
  })

// dropdown lenders
$("#getLenderRow").on('click', function () {
    let getDivDisplay = $(".getDiv2").css("display")
    if( getDivDisplay === "none" ){
      $(".getDiv2").css("display","flex")
  
    } else {
      $(".getDiv2").css("display","none")
    }
  })

  $("#postLenderRow").on('click', function () {
    let getDivDisplay = $(".postDiv2").css("display")
    if( getDivDisplay === "none" ){
      $(".postDiv2").css("display","flex")
  
    } else {
      $(".postDiv2").css("display","none")
    }
  })
  $("#putLenderRow").on('click', function () {
    let getDivDisplay = $(".putDiv2").css("display")
    if( getDivDisplay === "none" ){
      $(".putDiv2").css("display","flex")
  
    } else {
      $(".putDiv2").css("display","none")
    }
  })
//copy button
$('#copyBtn').on('click',function(){
    let copyText = $('#test')
    copyToClipboard(copyText)

})

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    console.log($temp.val())
    document.execCommand("copy");
    $temp.remove();
  }
// delete buttton


$('#deleteBtn').on('click',function(){
    $('#test').text("")
    

})