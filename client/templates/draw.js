Template.draw.helpers({

retMet: function(){
  var currentMetric = LocalData.findOne({system: "metric"});
   console.log(' metric = ' + currentMetric.unit);
  return currentMetric.unit;

},
retImp: function(){
  var currentImperial = LocalData.findOne({system: "imperial"});
  //console.log(' imperial = ' + currentImperial.unit);
  return currentImperial.unit;
},
returnLU: function(){
  var lu = Units.findOne({title: "LU"});
  //console.log(" lu.unit "+lu.unit);
return lu.unit;
},
newEarth: function(){
  // console.log("newEarth parseFloat(earthBase())  = "+ parseFloat(earthBase()));
  // console.log("newEarth parseFloat(metInputKM())  = "+ parseFloat(inputKM()));

  // var earthDiameter = parseFloat(earthBase()) * parseFloat(metInputKM());
  var earthDiameter = parseFloat(earthBase()) * parseFloat(inputKM());
  // console.log("newEarth  = "+ earthDiameter);
  // console.log("inputKM() = "+inputKM());
  //earthDiameter = earthDiameter *100000;// conver to cm from km
  // console.log("newEarth  = "+ earthDiameter);
  return convertKMtoCM(earthDiameter).toFixed(2);
},
newMoon: function(){
  // var moonDiameter = parseFloat(moonBase()) * parseFloat(metInputKM());
  var moonDiameter = parseFloat(moonBase()) * parseFloat(inputKM());
  //moonDiameter = moonDiameter * 100000;//convert to cm from km
  console.log("newMoon  = "+ moonDiameter);
  return convertKMtoCM(moonDiameter).toFixed(2);
},
unitName:function(){
var unitName = LocalData.findOne({role: "unitName"});
  return unitName.name;
},
getUnitType: function(){

  var unitType = LocalData.findOne({role: "systemChoice"});
  // console.log("unitType ="+unitType.choice);
  return "cm";
  //PUT THIS BACK  LATER :)
  // if(unitType.choice === "metric"){
  //
  //   return "cm";
  // }else if (unitType.choice ==="imperial") {
  //   return "inches";
  // }
}
});
//
Template.draw.events({
    'click .restart': function() {
      Router.go("/");
        //return startButton();
    }
});

////////// NON HELPER FUNCTIONS
function metInputKM(){
  var cM = LocalData.findOne({system: "metric"});// the numbers input
  return cM.unit/1000;
};

function inputKM(){//either input type cpnverted to meric. tmp until we handle imp measurements properly
  var cS = LocalData.findOne({role: "systemChoice"});// the numbers input
  var cM = LocalData.findOne({system: "metric"});// the numbers input
  var cI = LocalData.findOne({system: "imperial"});// the numbers input
  if(cS.choice=="metric"){
    return cM.unit/1000;

  }else if (cS.choice=="imperial") {
    return (cI.unit*0.0254) /1000;
  }


  // return cM.unit/1000;
};
function convertImpToMet(){
  //bla bla
};
function earthBase(){
var lU = Units.findOne({title: "LU"});// moon orbit
var eD = Units.findOne({title: "ED"});// earth diameter
//
var eDBase = eD.unit/lU.unit;//create the base ratio unit
return eDBase;
//
};
function moonBase(){
  var lU = Units.findOne({title: "LU"});// moon orbit
  var mD = Units.findOne({title: "MD"});// moon diameter
  //
  var mDBase = mD.unit/lU.unit;//
  return mDBase;
};
function convertKMtoCM(km){
  return km * 100000;

};
