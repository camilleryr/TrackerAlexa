/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

"use strict";
const Alexa = require("alexa-sdk");
const http = require("http");

const options = {
  hostname: "danko.mit.edu",
  path: "",
  method: "GET"
};

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.2a37651a-2ead-4304-b2c3-85279e8387e6";

const SKILL_NAME = "Chris Tracker";
const GET_FACT_MESSAGE = "Here you go: ";
const HELP_MESSAGE =
  "You can say tell me about Chris' Latest Run, Fastest Run of Longest Run... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  LaunchRequest: function() {
    this.response.speak(`Welcome to ${SKILL_NAME}, what can I tell you about?`);
    this.emit(":responseReady");
  },

  LatestRunIntent: function() {
    let speechOutput;
    options.path="/api/alexa/latest"
    const req = http.request(options, res => {
      res.on("data", d => {
        process.stdout.write(d);
        speechOutput = d;
        this.response.speak(speechOutput);
        this.emit(":responseReady");
      });
    });
    req.on("error", e => {
      console.error(e);
    });
    req.end();
  },

  FastestRunIntent: function() {
    let speechOutput;
    options.path="/api/alexa/fastest"
    const req = http.request(options, res => {
      res.on("data", d => {
        process.stdout.write(d);
        speechOutput = d;
        this.response.speak(speechOutput);
        this.emit(":responseReady");
      });
    });
    req.on("error", e => {
      console.error(e);
    });
    req.end();
  },
  
  LongestRunIntent: function() {
    let speechOutput;
    options.path="/api/alexa/longest"
    const req = http.request(options, res => {
      res.on("data", d => {
        process.stdout.write(d);
        speechOutput = d;
        this.response.speak(speechOutput);
        this.emit(":responseReady");
      });
    });
    req.on("error", e => {
      console.error(e);
    });
    req.end();
  },

  "AMAZON.HelpIntent": function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(":responseReady");
  },
  "AMAZON.CancelIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  },
  "AMAZON.StopIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  }
};
