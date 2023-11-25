// =====================================================================
// 						DECLARE VARIABLES
// =====================================================================

var TSSendAlive = 0;
var busInputs;
var busPlaybacks;
var busOutputs;
var selectLayer ;
var setLayer ;
var activeLayer;
var prevTrack ;
var nextTrack ;
var globals;
var names;
var selchan;
var vus;

var channelNames = {
	't.1' : "Channel 1", 
	't.2' : "Channel 2", 
	't.3' : "Channel 3", 
	't.4' : "Channel 4", 
	't.5' : "Channel 5", 
	't.6' : "Channel 6", 
	't.7' : "Channel 7", 
	't.8' : "Channel 8" };

var commandNames = {
	"name"	:	["Label", "s"],
	"level.l"	:	["Level L", "f"],
	"level.r" : ["Level R", "f"],
	"mix" : ["Fader", "s"],
	"gaindb" : ["Gain db", "s"],
	"pan" : ["Pan", "s"],
	"phantom" : ["Phantom", "b"],
	"invert" : ["Invert", "b"],
	"mute" : ["Mute", "b"],
	"solo" : ["Solo", "b"],
	"hpf.on" : ["LoCut on", "b"],
	"eq.hpf.freq" : ["HPF Freq", "s"],
	"eq.hpf.slope" : ["HPF Slope", "s"],
	"eq.on" : ["Eq on", "b"],
	"eq.b1.type" : ["Eq 1 Type", "s"],
	"eq.b1.gain" : ["Eq 1 Gain", "s"],
	"eq.b1.freq" : ["Eq 1 Freq", "s"],	
	"eq.b1.q" : ["Eq 1 Q", "s"],
	"eq.b2.gain" : ["Eq 2 Gain", "s"],
	"eq.b2.freq" : ["Eq 2 Freq", "s"],	
	"eq.b2.q" : ["Eq 2 Q", "s"],
	"eq.b3.type" : ["Eq 3 Type", "s"],
	"eq.b3.gain" : ["Eq 3 Gain", "s"],
	"eq.b3.freq" : ["Eq 3 Freq", "s"],
	"eq.b3.q" : ["Eq 3 Q", "s"],
	"dyn.on" : ["Dyn on", "b"],	
	"dyn.ratio" : ["Dyn Ratio", "s"],
	"dyn.threshold" : ["Dyn Threshold", "s"],
	"dyn.outgain" : ["Dyn OutGain", "s"] };
	
//====================================================================
//						INITIAL FUNCTIONS 
//====================================================================

function init() {

// Insert Parameter Buttons & Infos======>>>>>>>>>>>>>>>>>>>>>>>>
//	activeLayer = local.values.addStringParameter("Active Layer","Shows Active Layer", "Active Layer");
	selectLayer = local.values.addEnumParameter("Select Layer", "Select Layer", "Inputs","busInput","Playbacks","busPlayback","Outputs","busOutput") ;
	setLayer = local.values.addTrigger("Click to set Layer", "Click to set Layer" , false);	

// =====================================================================
// 						CREATE CONTAINERS
// =====================================================================

//Globals Container
	globals = local.values.addContainer("Globals");
		globals.setCollapsed(true);
		globals.addStringParameter("MasterFader", "", "");
		globals.addBoolParameter("globalMute", "", "");
		globals.addBoolParameter("globalSolo", "", "");
		globals.addStringParameter("----", "", "-----");
		globals.addStringParameter("Active Layer", "", "");
		globals.addTrigger("Previous Bank", "" , false);
		globals.addTrigger("Next Bank", "" , false);
		globals.addTrigger("Set Main Submix", "" , false);
		
//Channel Names Container
	names = local.values.addContainer("Track Names");
	names.setCollapsed(true);
	names.addStringParameter("Active Layer", "", "");
	for (var i = 0; i< 8; i++) {
		names.addStringParameter("Track "+(i+1), "", ""); }
		names.addStringParameter("Selected Track", "", "");
		names.addStringParameter("Selected Submix", "", "");
		
//Channel Fader  Container
	faders = local.values.addContainer("Track Faders");
	faders.setCollapsed(true);
	faders.addStringParameter("Active Submix", "", "");
	faders.addStringParameter("Active Layer", "", "");
	for (var i = 0; i< 8; i++) {
		faders.addStringParameter("Fader "+(i+1), "", "");  }

//Selected Channel Container
	selchan = local.values.addContainer("Selected Channel");
	selchan.setCollapsed(true);
	selchan.addStringParameter("Active Layer", "", "");
	selchan.addStringParameter("Active Channel", "", "");
	selchan.addTrigger("Previous Track", "Trigger Previous Track" , false);
	selchan.addTrigger("Next Track", "Trigger Next Track" , false);
	var champs = util.getObjectProperties(commandNames);
	for (var n = 0; n < champs.length; n++) {
				if (commandNames[champs[n]][1] == "f") {
				selchan.addFloatParameter(commandNames[champs[n]][0], "", 0, 0, 1); } 
				else if (commandNames[champs[n]][1] == "b") {
				selchan.addBoolParameter(commandNames[champs[n]][0], "", false); } 
				else if (commandNames[champs[n]][1] == "s") {
				selchan.addStringParameter(commandNames[champs[n]][0], "", ""); } }

//Vu-Meters Container
	vus = local.values.addContainer("Vumeters");
		vus.setCollapsed(true);
		vus.addStringParameter("Active Layer", "", "");
		vus.addFloatParameter("MainL", "", 0, 0, 1);
		vus.addFloatParameter("MainR", "", 0, 0, 1);
		vus.addStringParameter("---", "", "---");
	for (var i = 0; i< 8; i++) {
		vus.addFloatParameter("Level "+(i+1), "", 0, 0, 1); } 
		
}

//========================================================================
//							 VALUE CHANGE EVENTS
//========================================================================

function moduleValueChanged(value) {
// Trigger Layer 		
		if (value.name == "clickToSetLayer"){
		var layer = local.values.selectLayer.get() ;
		local.send("/1/"+layer, 1.0);
		local.send("/2/"+layer, 1.0);}
// prev & next Track		
		if (value.name == "previousTrack"){
		local.send("/2/track-", 1.0);}
		if (value.name == "nextTrack"){
		local.send("/2/track+", 1.0);}
// prev & next Bank		
		if (value.name == "previousBank"){
		local.send("/1/bank-", 1.0);}
		if (value.name == "nextBank"){
		local.send("/1/bank+", 1.0);}
// Set Main Submix		
		if (value.name == "setMainSubmix"){
		local.send("/setSubmix", 1.0);}  
}
	
	
//============================================================
//							OSC EVENTS
//============================================================	
	
	function oscEvent(address, args) { 
	
// Sel Track and Sub Names
		if (address=="/2/trackname"){ 
			local.values.trackNames.selectedTrack.set(args[0]); }
		if (address=="/1/labelSubmix"){
			local.values.trackNames.selectedSubmix.set(args[0]);
			local.values.trackFaders.activeSubmix.set(args[0]); }
	
// Track Names 
		for (var n = 1; n<= 8; n++) {
		if (address == "/1/trackname"+n){
			local.values.trackNames.getChild('track'+n).set(args[0]);  } }	
			
// Track Faders 
		for (var n = 1; n<= 8; n++) {
		if (address == "/1/volume"+n+"Val"){
			local.values.trackFaders.getChild('fader'+n).set(args[0]);  } }	
	
// Track Levels				
		if (address=="/1/level1Left"){
			local.values.vumeters.mainL.set(args[0]); }
		if (address=="/1/level1Right"){
			local.values.vumeters.mainR.set(args[0]); }
		// Tracks 1 to 8 =>	
		for (var n = 1; n<= 8; n++) {
		if (address == "/1/level"+n+"Left"){
			local.values.vumeters.getChild('level'+n).set(args[0]);  } }	
				
// Globals	
		if (address=="/1/mastervolumeVal"){
			local.values.globals.masterFader.set(args[0]); }
			if (address=="/1/globalMute"){ 
			local.values.globals.globalMute.set(args[0]); }
		if (address=="/1/globalSolo"){ 
			local.values.globals.globalSolo.set(args[0]); }
// Layers			
		if (address=="/1/busInput"){ 
//			local.values.globals.inputLayer.set(args[0]); 
			if (args[0]==true) {
//			local.values.activeLayer.set("Inputs") ;
			local.values.trackNames.activeLayer.set("Inputs") ;
			local.values.trackFaders.activeLayer.set("Inputs") ;
			local.values.selectedChannel.activeLayer.set("Inputs") ;
			local.values.vumeters.activeLayer.set("Inputs") ;
			local.values.globals.activeLayer.set("Inputs") ; } }
		if (address=="/1/busPlayback"){ 
//			local.values.globals.playbackLayer.set(args[0]);
			if (args[0]==true) {
//			local.values.activeLayer.set("Playbacks") ;
			local.values.trackNames.activeLayer.set("Playbacks") ;
			local.values.trackFaders.activeLayer.set("Playbacks") ;
			local.values.selectedChannel.activeLayer.set("Playbacks") ;
			local.values.vumeters.activeLayer.set("Playbacks") ;
			local.values.globals.activeLayer.set("Playbacks") ; } }
		if (address=="/1/busOutput"){ 
//			local.values.globals.outputLayer.set(args[0]);
			if (args[0]==true) {
//			local.values.activeLayer.set("Outputs") ;
			local.values.trackNames.activeLayer.set("Outputs") ;
			local.values.trackFaders.activeLayer.set("Outputs") ;
			local.values.selectedChannel.activeLayer.set("Outputs") ;
			local.values.vumeters.activeLayer.set("Outputs") ;
			local.values.globals.activeLayer.set("Outputs") ; } }
				
// Selected channel (Page2)
		if (address=="/2/trackname"){ 
			local.values.selectedChannel.label.set(args[0]);
			local.values.selectedChannel.activeChannel.set(args[0]);}
		if (address=="/2/levelLeft"){
			local.values.selectedChannel.levelL.set(args[0]); }
		if (address=="/2/levelRight"){
			local.values.selectedChannel.levelR.set(args[0]); }
		if (address=="/2/gainVal"){
			local.values.selectedChannel.gainDb.set(args[0]); }
		if (address=="/2/volumeVal"){ 
			local.values.selectedChannel.fader.set(args[0]); }
		if (address=="/2/panVal"){ 
			local.values.selectedChannel.pan.set(args[0]); }
		if (address=="/2/solo"){ 
			local.values.selectedChannel.solo.set(args[0]); }
		if (address=="/2/cue"){ 
			local.values.selectedChannel.solo.set(args[0]); }
		if (address=="/2/phantom"){ 
			local.values.selectedChannel.phantom.set(args[0]); }
		if (address=="/2/mute"){ 
			local.values.selectedChannel.mute.set(args[0]); }
		if (address=="/2/phase"){ 
			local.values.selectedChannel.invert.set(args[0]); }
		if (address=="/2/eqEnable"){ 
			local.values.selectedChannel.eqOn.set(args[0]); }
		if (address=="/2/compexpEnable"){ 
			local.values.selectedChannel.dynOn.set(args[0]); }
// Selected channel HPF		
		if (address=="/2/lowcutEnable"){ 
			local.values.selectedChannel.loCutOn.set(args[0]); }
		if (address=="/2/lowcutFreqVal"){ 
			local.values.selectedChannel.hpfFreq.set(args[0]); }
			if (address=="/2/lowcutGradeVal"){ 
			local.values.selectedChannel.hpfSlope.set(args[0]); }
// Selected channel EQ Band 1		
		if (address=="/2/eqType1Val"){ 
			local.values.selectedChannel.eq1Type.set(args[0]); }
		if (address=="/2/eqGain1Val"){ 
			local.values.selectedChannel.eq1Gain.set(args[0]); }
		if (address=="/2/eqFreq1Val"){ 
			local.values.selectedChannel.eq1Freq.set(args[0]); }		
		if (address=="/2/eqQ1Val"){ 
			local.values.selectedChannel.eq1Q.set(args[0]); }
// Selected channel EQ Band 2				
		if (address=="/2/eqFreq2Val"){ 
			local.values.selectedChannel.eq2Freq.set(args[0]); }
		if (address=="/2/eqGain2Val"){ 
			local.values.selectedChannel.eq2Gain.set(args[0]); }
		if (address=="/2/eqQ2Val"){ 
			local.values.selectedChannel.eq2Q.set(args[0]); }
// Selected channel EQ Band 3		
		if (address=="/2/eqType3Val"){ 
			local.values.selectedChannel.eq3Type.set(args[0]); }
		if (address=="/2/eqFreq3Val"){ 
			local.values.selectedChannel.eq3Freq.set(args[0]); }
		if (address=="/2/eqGain3Val"){ 
			local.values.selectedChannel.eq3Gain.set(args[0]); }
		if (address=="/2/eqQ3Val"){ 
			local.values.selectedChannel.eq3Q.set(args[0]); }
// Selected channel Dyn	
		if (address=="/2/compRatioVal"){ 
			local.values.selectedChannel.dynRatio.set(args[0]); }
		if (address=="/2/compTrshVal"){ 
			local.values.selectedChannel.dynThreshold.set(args[0]); }
		if (address=="/2/compexpGainVal"){ 
			local.values.selectedChannel.dynOutGain.set(args[0]); }

}

//============================================================
//				KEEP ALIVE -> X-Remote Loop
//============================================================
function update(deltaTime) {
	var now = util.getTime();
	if (now > TSSendAlive) {
		TSSendAlive = now + 0.5;
		keepAlive(); }
}

function keepAlive() {
	
	if (val == 0)
{local.send("/1/trackname1");
val= val+1;}
else {local.send("/2/trackname");	
val=0 ;}
}

//=========================================================
//					 REGULAR FUCNTIONS
//=========================================================
// Globals

function undo() {
	local.send("/3/undo", 1.0);	
}

function redo() {
	local.send("/3/redo", 1.0);	
}

function globalMute() {
	local.send("/1/globalMute", 1.0);	
}

function globalSolo() {
	local.send("/1/globalSolo", 1.0);	
}

function Trim() {
	local.send("/1/trim", 1.0);
}

function mainDim() {
	local.send("/1/mainDim", 1.0);
}

function mainRecall() {
	local.send("/1/mainRecall", 1.0);
}

function mainMono() {
	local.send("/1/mainMono", 1.0);
}

function mainTalkback() {
	local.send("/1/mainTalkback", 1.0);
}

function mainExtin() {
	local.send("/1/mainExtin", 1.0);
}

function mainMuteFx() {
	local.send("/1/mainMuteFx", 1.0);
}

// Set Layer (Page1)

function set_layer(target) {
	local.send("/1/"+target, 1.0);
	local.send("/2/"+target, 1.0);
	
}

function BankMoins() {
	local.send("/1/bank-", 1.0);	
}

function BankPlus() {
	local.send("/1/bank+", 1.0);	
}

// Submixes and Groups etc....

function SubmixMain() { // Main-St
	local.send("/setSubmix", 1.0);
}

function SubmixPhones() { // Phones-St
	local.send("/setSubmix", 6.0);
}

function Submix(val) { // number 0-16
	local.send("/setSubmix", val);
}

function Snapshots(no) { // number 1-8
	local.send("/3/snapshots/"+no+"/1", 1.0);
}
	
function Mutegroups(no) { // number 1-4
	local.send("/3/muteGroups/"+no+"/1", 1.0);	
}

function Sologroups(no) { // number 1-4
	local.send("/3/soloGroups/"+no+"/1", 1.0);	
}

function Fadergroups(no) { // number 1-4
	local.send("/3/faderGroups/"+no+"/1", 1.0);	
}

//Master

function MasterVolume(val ) {	

	local.send("/1/mastervolume", val);
}

function MasterChVolume(val ) {	

	local.send("/1/mastervolume", val);
}


//Channels

function ChVolume(layer, n, val) { // channel 1-32
	local.send("/1/"+layer+"", 1.0);

	local.send("/1/volume"+n+"", val);
}

function ChPan(layer, n, val) { // channel 1-32
	local.send("/1/"+layer+"", 1.0);

	local.send("/1/pan"+n+"", val);
}

function ChMute(layer, n , val) { // channel 1-32
	local.send("/1/"+layer+"", 1.0);
	
	local.send("/1/mute/1/"+n+"", val);
}

function ChSolo(layer, n , val) { // channel 1-32
	local.send("/1/"+layer+"", 1.0);
	
	local.send("/1/solo/1/"+n+"", val);
}

function ChSelect(layer, n , val) { // channel 1-32
	local.send("/1/"+layer+"", 1.0);
	
	local.send("/1/select/1/"+n+"", val);
}



//Page-2
//Selected Channel (Page2)

function SelChannelVol(val ) {	// on selected channel
	
	local.send("/2/volume", val);
}

function SelChGain(val) { // on selected channel
	
	local.send("/2/gain", val);
	local.send("/2/gainRight", val);
}

function SelChPan(val) { // on selected channel
	
	local.send("/2/pan", val);
}

function SelChMute() { // on selected channel
	local.send("/2/mute", 1.0);
}

function SelChSolo() { // on selected channel
	local.send("/2/solo", 1.0);
}

function SelChCue() { // on selected channel
	local.send("/2/cue", 1.0);
}

function SelChPhase() { // on selected channel
	local.send("/2/phase", 1.0);
	local.send("/2/phaseRight", 1.0);
}

function SelChPhantom() { // on selected channel
	local.send("/2/phantom", 1.0);
}

//Selected Specials (Page2)

function SelSetLayer(target) {
	
	local.send("/2/"+target+"", 1.0);
	
}

function SyncTrigg() {
	local.send("/1/trackname1");			
}

function TrackTrigg1() {
	local.send("/1/trackname1");	
}

function TrackTrigg2() {
	local.send("/2/trackname");	
}

function TrackMoins() {
	local.send("/2/track-", 1.0);	
}

function TrackPlus() {
	local.send("/2/track+", 1.0);	
}

function SelChAutoset() { // on selected channel
	local.send("/2/autoset", 1.0);
}

function SelChLoopback() { // on selected channel
	local.send("/2/loopback", 1.0);
}

function SelChStereo() { // on selected channel
	local.send("/2/stereo", 1.0);
}


//Selected Channel EQ-Settings

function SelChEqFull(val, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14) { // on selected channel
	local.send("/2/eqEnable", val);
	local.send("/2/eqType1", val1);
	
	local.send("/2/eqGain1", val2);
	local.send("/2/eqFreq1", val3);
	local.send("/2/eqQ1", val4);
	
	local.send("/2/eqGain2", val5);
	local.send("/2/eqFreq2", val6);
	local.send("/2/eqQ2", val7);
	local.send("/2/eqType3", val8);
	
	local.send("/2/eqGain3", val9);
	local.send("/2/eqFreq3", val10);
	local.send("/2/eqQ3", val11);
	local.send("/2/lowcutEnable", val12);
	local.send("/2/lowcutGrade", val13);
	local.send("/2/lowcutFreq", val14);
			
}

function SelChEqSingle(val, val1, val2, val3, val4) { // on selected channel
	local.send("/2/eqType"+val+"", val1);
	
	local.send("/2/eqGain"+val+"", val2);
	local.send("/2/eqFreq"+val+"", val3);
	
	local.send("/2/eqQ"+val+"", val4);	
}

function SelChEqOn() { // on selected channel
	local.send("/2/eqEnable", 1.0);
}

function SelChLocut(val1, val2) { // on selected channel
	local.send("/2/lowcutEnable", 1.0);
	local.send("/2/lowcutGrade", val1);
	local.send("/2/lowcutFreq", val2);

}

function SelChComp(val1, val2, val3, val4, val5, val6, val7) {
	local.send("/2/compexpEnable", 1.0);
	
	local.send("/2/compexpGain", val1);
	local.send("/2/compexpAttack", val2);
	local.send("/2/compexpRelease", val3);
	local.send("/2/compTrsh", val4);
	local.send("/2/compRatio", val5);
	local.send("/2/expTrsh", val6);
	local.send("/2/expRatio", val7);	
}

function SelChAutolevel(val1, val2, val3) {
	local.send("/2/alevEnable", 1.0);

	local.send("/2/alevMaxgain", val1);
	
	local.send("/2/alevHeadroom", val2);
	local.send("/2/alevRisetime", val3);
}

//Page-3
//FX - Reberb ... this will only work on interfaces with DSP like UCX and UFX etc.... !!

function ReverbOn() {
	local.send("/3/reverbEnable", 1.0);
}

function reverbType(val) {
	local.send("/3/reverbType", val);
}

function reverbPredelay(val) {  
	local.send("/3/reverbPredelay" , val);
}

function reverbLowcut(val) {  
	local.send("/3/reverbLowcut" , val);
}

function reverbHighcut(val) {  
	local.send("/3/reverbHighcut" , val);
}

function reverbRoomscale(val) {  
	local.send("/3/reverbRoomscale" , val);
}

function reverbAttack(val) {  
	local.send("/3/reverbAttack" , val);
}

function reverbHold(val) {  
	local.send("/3/reverbHold" , val);
}

function reverbRelease(val) {  
	local.send("/3/reverbRelease" , val);
}

function reverbTime(val) {  
	local.send("/3/reverbTime" , val);
}
	
function reverbHighdamp(val) {  
	local.send("/3/reverbHighdamp" , val);
}

function reverbSmooth(val) {  
	local.send("/3/reverbSmooth" , val);
}

function reverbWidth(val) {  
	local.send("/3/reverbWidth" , val);
}

function reverbVolume(val) {  
	local.send("/3/reverbVolume" , val);
}


//FX - Delay ... this will only work on interfaces with DSP like UCX and UFX etc.... !!

function DelayOn() {
	local.send("/3/echoEnable", 1.0);
}

function delayType(val) {
	local.send("/3/echoType", val);;
}	

function echoDelaytime(val) {  
	local.send("/3/echoDelaytime" , val);
}

function echoFeedback(val) {  
	local.send("/3/echoFeedback" , val);
}

function echoWidth(val) {  
	local.send("/3/echoWidth" , val);
}

function echoVolume(val) {  
	local.send("/3/echoVolume" , val);
}



//Player ... this will only work on UFX !!
function Play() {
	local.send("/3/recordPlayPause", 1.0);
	local.send("/3/recordPlayPause", 0.0);	
}

function Stop() {
	local.send("/3/recordStop", 1.0);
	local.send("/3/recordPlayPause", 0.0);	
}

function Record() {
	local.send("/3/recordStop", 1.0);
	local.send("/3/recordPlayStart", 0.0);	
}

function Time() {
	local.send("/3/recordTime", 1.0);
}
