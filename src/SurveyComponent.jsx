import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { Converter } from "showdown";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./json";
import { themeJson } from "./theme";

function SurveyComponent() {
    const survey = new Model(json);
    // You can delete the line below if you do not use a customized theme
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    //Create showdown markdown converter
    var converter = new Converter();
    survey.onTextMarkdown.add(function(survey, options){
        //convert the markdown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
    });
    
    return (<Survey model={survey} />);
}

export default SurveyComponent;