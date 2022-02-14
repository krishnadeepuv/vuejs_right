var validate = function (userInput, question_unique_name) {
    /** Name screen */
    if (question_unique_name === "and-you-are") {
        if (userInput.length <= 0) {
            return {
                status: "error",
                message: "Please enter a valid input."
            };
        } else if (!/^[A-Za-z ]+$/.test(userInput)) {
            return {
                status: "error",
                message: "Numbers and special characters are not allowed."
            };
        }
    } else if (question_unique_name === "which-of-these-are-you") {
        /** Current status screen */
        if (userInput.length <= 0) {
            return {
                status: "error",
                message: "At least one to be selected"
            };
        }
    }
    else if (question_unique_name === "discipline-for-your-masters") {
        /** Domain screen */
        if (userInput.subdomain_id < 0) {
            return {
                status: "error",
                message: "At least one to be selected"
            };
        }
    }
    else if (question_unique_name === "what-do-you-want-to-study") {
        /** universities screen */
        if (userInput.programs.length <= 0) {
            return {
                status: "error",
                message: "At least one to be selected"
            };
        }
    } else if (question_unique_name === "what-are-your-scores") {
        /** Scores screen */
        if (userInput.toefl) {
            userInput.tofel = userInput.toefl;
        }
        if (userInput.gre.quant < 130 || userInput.gre.quant > 170) {
            return {
                status: "error",
                message: "Invalid input: GRE - Quant. Acceptable range: 130 - 170"
            };
        } else if (userInput.gre.verbal < 130 || userInput.gre.verbal > 170) {
            return {
                status: "error",
                message: "Invalid input: GRE - Verbal.  Acceptable range: 130 - 170"
            };
        } else if (userInput.gre.AWA < 0 || userInput.gre.AWA > 6) {
            return {
                status: "error",
                message: "Invalid input: GRE - AWA.  Acceptable range: 0 - 6"
            };
        } else if (userInput.gre.AWA % 0.5 != 0) {
            return {
                status: "error",
                message: "Invalid input: GRE - AWA. Should be multiples of 0.5"
            };
        }

        let ieltsInput = 0;
        let tofelInput = 0;

        for (const key of Object.keys(userInput.ielts)) {
            if (key === "total") continue;
            ieltsInput += parseFloat(userInput.ielts[key]) ? parseFloat(userInput.ielts[key]) : 0;
            tofelInput += parseFloat(userInput.tofel[key]) ? parseFloat(userInput.tofel[key]) : 0;
        }

        if (ieltsInput == 0 && tofelInput == 0) {
            return {
                status: "error",
                message: "Atleast one should be opted - TOFEL/IELTS"
            };
        }
        if (ieltsInput == 0 || tofelInput > 0) {
            for (const key of Object.keys(userInput.tofel)) {
                if (key === "total") continue;
                if (userInput.tofel[key] < 1 || userInput.tofel[key] > 30) {
                    return {
                        status: "error",
                        message: "Invalid input: TOFEL - " + key + ". Acceptable range: 1 - 30"
                    };
                }
                // console.log(key, obj[key]);
            }
        }

        if (tofelInput == 0 || ieltsInput > 0) {
            for (let key of Object.keys(userInput.ielts)) {
                if (key === "total") continue;
                if (userInput.ielts[key] < 0.5 || userInput.ielts[key] > 9) {
                    return {
                        status: "error",
                        message: "Invalid input: IELTS - " + key + ". Acceptable range: 0.5 - 9"
                    };
                } else if (userInput.ielts[key] % 0.5 != 0) {
                    return {
                        status: "error",
                        message: "Invalid input: IELTS - " + key + ". Should be multiples of 0.5"
                    };
                }
            }
        }
    } else if (question_unique_name === "most-important-thing-for-you") {
        /** priority screens */
        let count = 0;
        userInput.actual_priorities.forEach(element => {
            if (element.score == 5) {
                count++;
            }
        });
        if (count >= 12) {
            return {
                status: "error",
                message: "It seems that you have not set the Priorities."
            };
        }
    } else if (question_unique_name === "work-experience") {
        if (userInput.total < 0) {
            return {
                status: "error",
                message: "Invalid input - Total"
            };
        }
        else if (userInput.research < 0) {
            return {
                status: "error",
                message: "Invalid input - Research"
            };
        }
        else if (userInput.program < 0) {
            return {
                status: "error",
                message: "Invalid input - Program "
            };
        } else if (userInput.total < userInput.research) {
            return {
                status: "error",
                message: "Research cannot be greater than total"
            };
        }
        else if (userInput.total < userInput.program) {
            return {
                status: "error",
                message: "Program related experience cannot be greater than total"
            };
        } else if (userInput.total > 120) {
            return {
                status: "error",
                message: "Total cannot be greater than 10 years"
            };
        }
    }
    else if (question_unique_name === "your-bachelor-degree") {
        /** bachelor screen */
        if (userInput.institution == "-1") {
            return {
                status: "error",
                message: "At least one to be selected - Institution"
            };
        }
        else if (userInput.program == "-1") {
            return {
                status: "error",
                message: "At least one to be selected - Program/Degree"
            };
        }
        else if (userInput.scoreType == "score") {
            if (userInput.your_score > 100 || userInput.your_score < 1 || userInput.max_score > 100 || userInput.max_score < 1) {
                return {
                    status: "error",
                    message: "Enter a valid Scores"
                };
            }
            else if (userInput.your_score > userInput.max_score) {

                return {
                    status: "error",
                    message: "Max score in batch cannot be less than yours."
                };

            }
        }
    } else if (question_unique_name == "you-published-any-research") {
        /** research screen */
        for (const key of Object.keys(userInput)) {
            if (userInput[key] < 0 || userInput[key] > 20) {
                return {
                    status: "error",
                    message: "Invalid input - " + userInput[key] + ". Acceptable range: 0 - 20"
                };
            }
        }
    } else if (question_unique_name == "maximum-cost-of-attendance") {
        /** budget screen */
        if (userInput["budget"] < 0 || userInput["budget"] > 30000000) {
            return {
                status: "error",
                message: "Invalid input - Budget cannot be more than 3 Cr"
            };
        }
    }
    /** dashboard */
    else if (question_unique_name === "match-to-exp") {
        if (userInput < 0) {
            return {
                status: "error",
                message: "Invalid input Match to Expectation threshold"
            };
        }
    }
    else if (question_unique_name == "maximum-cost-of-attendance-dboard") {
        /** budget screen */
        if (userInput < 0 || userInput > 30000000) {
            return {
                status: "error",
                message: "Invalid input - Budget cannot be more than 3 Cr"
            };
        }
    }

    else {
        return {
            status: "all-good"
        };
    }
    return {
        status: "all-good"
    };
};

export default {
    validate
};