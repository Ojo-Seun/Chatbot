import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router()
import dialogflow from 'dialogflow'
import { v4 as uuidv4 } from 'uuid';
import CoursesModel from '../models/CoursesSchema.js'
import keys  from '../config/keys.js'

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






const projectId = keys.googleProjectId
const privateKey = keys.googlePrivateKey
const sessionId = uuidv4()
const LanguageCode = keys.LanguageCode

const credentials = {
    client_email: keys.googleClientEmail,
    private_key:privateKey
}
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);




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

    const responses = await sessionClient.detectIntent(request);
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

    const responses = await sessionClient.detectIntent(request);
    const result = await responses[0].queryResult;

    res.status(200).json({
        Response:result.fulfillmentText
    })

    
}))





export default router