import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router()
import dialogflow from 'dialogflow'
import { v4 as uuidv4 } from 'uuid';
import CoursesModel from '../models/CoursesSchema.js'
import keys from '../config/keys.js'
const matchIntent = (course, intent, courseTitle) => {
    

    if (course.title) {
            
            switch (intent) {
                case "getCourseDescription":
                    return course.description;
                case "getCourseDuration":
                    return `The duration for ${courseTitle} is ${course.duration.fullTime} for full-time students and ${course.duration.partTime} for part-Time students`
                case "getCourseTuition":
                    return `${course.tuition} for ${courseTitle}`
                case "getCourseRequirement":
                    return `${course.requirement}`
                case "getApplicationPeriod":
                    return `${course.applicationPeriod}`
                case "getCourseStudyMode":
                    return course.studyMode
                case "getContact":
                    return `You can contact Programme Director/Adminsions on ${course.contact.email} or ${course.contact.phoneNumber}`
                case "howToApply":
                    return course.apply
                case "getDepartment":
                    return "Send message to department"
        }
    }
    
    return "Please re-phrase the course title e.g Advance Computer Science course"
}






const project_id = keys.project_id
const private_key = keys.private_key
const sessionId = uuidv4()
const LanguageCode = keys.LanguageCode

// const credentials = {
//   "type":keys.type,
//   "project_id":keys.project_id,
//   "private_key_id":keys.private_key_id,
//   "private_key":keys.private_key,
//   "client_email":keys.client_email,
//   "client_id":keys.client_id,
//   "auth_uri":keys.auth_uri,
//   "token_uri":keys.token_uri,
//   "auth_provider_x509_cert_url":keys.auth_provider_x509_cert_url,
//   "client_x509_cert_url":keys.client_x509_cert_url
// }

const credentials = {
    "type": "service_account",
  "project_id": "mscbot-9gyc",
  "private_key_id": "3daa6ada930ea873ac5551bdb2bae127fa699ab9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDd37Yx8QqYOWue\nTqPkqwi5X34D+dkEGL6agAz5XwyHG40mmvtHtnR8OEEojfojw0OYdR+bmVPZJ29+\n22ODj1YF2Is3Kxl0HEKI29CxsS+lkAsutnBoH0f87ehhXxr9xckFDlDFOk8WJ0dD\n3MHsSwLu7qKErs0VnlfQf8bpD511V/DVrP6J8UaHthZmFDFPdzSj9gRrZVj7/EmX\n1uO7ocfCsaVuoqfmH+QQ02OnQ1SCkh0eXucugOyHy9yrqk1Pc8D0dBOJZyaEeiDZ\nNmFjOWeGJ8JGjcJAWgTE+ipwYfGh6Z4v7eGZ2kdxXNXLUcHv8tQoALG2zP8VfYwH\nKZ8Cj3UVAgMBAAECggEAB+k33Rh/3PUhK/QYXmklxrxLqTchoIaEV0xtCgA0WWXn\nVsLMZl5wUVSNKDXFvzwxXxCAB8OEDJheHpsSdYipE8zIi/dGsU/npGsYChnr/b6A\n05HQOLoyzicqc7xZIUbJ19sOkLW3R64vWZFXvcXf7SaHl20HJXfvoCDKNhmnLt2a\nly/LwoXcP2SRpmfjYC59zg+gqlZAmqo6FxQmnkFO22dMrcm01CiyHrtUy65c+RH5\ndp7mgfhFIMQX3/YirvRJLhvlbL9LjTt3HjTL0yISukPInBf/rbGUmpQbfXVe4DM8\nDQOoPNv9ENPKM8hCRFvNnBHweRsdTK4iDINQwNzQOQKBgQD4qMqKOVZ19ATUU546\nMt81IFqhDX1z1VkRFJeLddUyDpJX+IWsfBlAp96mDvS7m2t8toZqo54Mt4N4QoTR\nXfEES25U++f3DdT5GZhnD0ewPBls5G9wOX8E67VuXyTMBjpr9JBQcu4pPbPcEjVp\nIMh4zFLRTeqAtuMrb0zKqjCtWQKBgQDkbH436m6+lRT5jNsNev0sLc5qWtHonGYr\n2mYF7QOKiIeyygRD0Q8EGWXaGuC5qrXWUrd4Ja7MTx82QVKMuQL7gDuPGaWbJuNX\n7vQqfA1WvDy+S2bJsXwQ1urWknkQSstL8yWOr23WhNr0yQcWiy35wm90HFoN/WGh\ndeNtpXYiHQKBgQDrtLyBOAbQOqZVSoojKtPQfUHLhokTwvnxqe5ZITIdiBiK0SaN\nMPmTA02XZXfxWksSZcaW0U/hSBeUaKGUAROU+Ze1cTAaTP9DvVJs5twSn3WOdh94\nZtgTpwdNf1zXFVRNvv8Jc1h0uWuDwbLlW1EMyMn8Y3pV1ocSRiepuJf5yQKBgQDO\n1OZdHytz6m35oO9gf3LrI/b6Go5jP+rL3o/u4bQJJqMo4v+FoLEmFxFAsoG13LuV\n+4QhiI2EdkheyjtDLOtka7KCWsi3ejj1EGuKZJV3ai7eaEwEaW9bmB9Ad5SjifYX\nKW1ii7q7OcVBTR3b7d6Nft+IlXt9m2dh2es7B022iQKBgQCXodnKal53kPLugQD4\n04ws5UjDTvIIBDxTDzLCcv9r4IIyNA9wpRtXDIwzvNQ5ARTsG7upjMI/OoZN7Ra5\n7I3e5xuApB5jxvq4bcJP0e0HM3JKF2L1Bs3DCkWOOjorAuY9Y5j5/qhwHh7oX2Cj\nqD8WFcsMMLRlmIQLRPwIqvem7A==\n-----END PRIVATE KEY-----\n",
  "client_email": "spantry@mscbot-9gyc.iam.gserviceaccount.com",
  "client_id": "102890326297579385042",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/spantry%40mscbot-9gyc.iam.gserviceaccount.com"
    
}
const sessionClient = new dialogflow.SessionsClient({project_id, credentials});
const sessionPath = sessionClient.sessionPath(project_id, sessionId);




router.post('/textQuery', expressAsyncHandler(async (req, res) => {

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: LanguageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request)
        
    const result = await responses[0].queryResult;
    const intent = result.intent.displayName
    const Accuracy = result.intentDetectionConfidence * 100
    const Understood = intent === "Default Fallback Intent" ? false : true
    if (result.fulfillmentText) {
        res.status(200).json({
            Response: result.fulfillmentText,
            Understood,
            Accuracy
            
            
    })
    } else {
        const courseTitle = result.parameters.fields.courseTitle.stringValue
        const course = await CoursesModel.findOne({title:courseTitle})
        const Response = matchIntent(course, intent, courseTitle)
        const departmentEmail = intent === "getDepartment"? course.contact.email : ''
        
        res.status(200).json({
            Response,
            departmentEmail,
            Understood,
            Accuracy
        })
    }


    
    
}))



router.post('/eventQuery', expressAsyncHandler(async (req, res) => {

    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: LanguageCode,
            },
        },
    }

    const responses = await sessionClient.detectIntent(request)
    
    const result = await responses[0].queryResult;

    res.status(200).json({
        Response:result.fulfillmentText
    })

    
}))





export default router