// Packages needed
const createLicense = require('../utils/createLicense.js');

// generate the table of contents
const tableOfContents = (triggerArr, featuresArr, usageArr, testsArr) => {
    // array that holds the table of contents
    let tableOfContentsArr = [
        '* [Installation](#installation)',
        '* [Usage](#usage)',
        '* [Features](#features)',
        '* [Contributing](#contributing)',
        '* [Questions](#questions)',
        '* [Tests](#tests)',
        '* [Credits](#credits)',
        '* [License](#license)'
    ]
    // table of contents string that will be returned to the markdown generator
    let toc = ``
    // if no installation instructions, remove installation from ToC
    if(!triggerArr[0].confirmInstall) {
        tableOfContentsArr[0] = '';
    }
    // if no featuress, remove features from ToC
    if(!featuresArr[0].confirmFeature) {
        tableOfContentsArr[2] = '';
    }
    // if no tests, remove tests from ToC
    if(!testsArr[0].confirmTest) {
        tableOfContentsArr[5] = '';
    }
    // if no license, remove license from ToC
    if(usageArr[0].license === 'None') {
        tableOfContentsArr[7] = '';
    }
    // build toc string from the remaining values in the array and return toc
    for(i=0; i < tableOfContentsArr.length; i++) {
        if (tableOfContentsArr[i] != '') {
            toc = `${toc}
${tableOfContentsArr[i]}`
        }
    }

    return `${toc}`
};

// generate installation steps
const generateInstall = (triggerArr, stepsArr) => {
    // if there are no installation steps return an empty string
    if(!triggerArr[0].confirmInstall) {
        return ``
    }
    // initial values for step number and the optional string
    let step = 0;
    let isOptional = ``;
    // return installation header and installation steps
    return `---

## Installation
${stepsArr.map(({ title, description, optional }) => {
                    step++;
                    if (!optional) {
                        isOptional = ``
                    } else {
                        isOptional = ` (*Optional*)`;
                    }
                    return `#### Step ${step})
${title}${isOptional} - ${description};
`;
                })
                .join('')}`;
};

// generate usage content
const generateUsage = (usageArr) => {
    return`${usageArr.filter(({ confirmLink }) => confirmLink)
    .map(({ link}) => {
        return `[${link}](${link}?target=_blank)`;
    })
    .join('')}
    ${usageArr.filter(({ confirmScrnSht }) => confirmScrnSht)
    .map(({ scrnSht}) => {
        return `
![screenshot](${scrnSht})`;
    })
    .join('')}`

}
// generate features
const generateFeatures = featuresArr => {
    // return an empty string if there are no features
    if(!featuresArr[0].confirmFeature) {
        return '';
    }
    // return feature header and features
    return `---

## Features
${featuresArr.filter(({ confirmFeature }) => confirmFeature)
                .map(({ featureName, featureDescription}) => {
                    
                    return `- **${featureName}** - *${featureDescription}*
`;
                })
                .join('')}`;
};

// generate the contribution section
const generateContribute = (usageArr, projArray) => {
    // if the user selects no contributions
    if(!usageArr[0].confirmContribute) {
        return 'This project is not currently seeking contributions';
    }
    // if the user leaves blank to signify they want to use the contributor covenant
    if(usageArr[0].contributing === '') {
        return `This project operates under the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/?target=_blank). For more information see the [Contributer Covenant FAQ](https://www.contributor-covenant.org/faq/?target=_blank) or contact [${projArray.userName}](mailto:${projArray.userEmail}?subject=Contribution%20question%20concerning%20${projArray.repoName}) with any additional questions or comments.`;
    }
    // otherwise use the users input
    return `${usageArr[0].contributing}`
};

// generate test section
const generateTests = (testsArr) => {
    // if the user selects no tests
    if(!testsArr[0].confirmTest) {
        return '';
    }
    // otherwise cycle trough the array listing the tests
    return `---

## Tests
${testsArr.filter(({ confirmTest }) => confirmTest)
                .map(({ test, testExample }) => {
                    return `

### ${test}
- ${testExample}`;
                })
                .join('')}`;
};

// generate the collaborators in the credits section
const generateCollabCredits = collabArr => {
    // filter by confirmCredits credits and add collaborator info if needed
    return `${collabArr.filter(({ confirmCredits }) => confirmCredits)
                .map(({ collaborator, collabGitHub }) => {
                    return ` / [${collaborator}](https://github.com/${collabGitHub}?target=_blank)`;
                })
                .join('')}`;
};

// generate the third party assets in the credit section
const generateThirdPartyCredits = thirdPartyArr => {
    // exit if there are no third party credits
    if(!thirdPartyArr[0].confirmThirdParty) {
        return '';
    }
    // otherwise cycle trough the array listing third party assets
    return `### Third Party Assests Used
${thirdPartyArr.filter(({ confirmThirdParty }) => confirmThirdParty)
                .map(({ thirdParty, thirdPartyLink }) => {
                    return `- [${thirdParty}](${thirdPartyLink}?target=_blank)
                    
`;
                })
                .join('')}`;
};

// generate the tutorials in the credits section
const generateTutorialCredits = tutorialArr => {
    // exit if there are no tutorial credits
    if(!tutorialArr[0].confirmTutorial) {
        return '';
    }
    // otherwise cycle trough the array listing tutorials
    return `### Tutorials & Other Resources Used
${tutorialArr.filter(({ confirmTutorial }) => confirmTutorial)
                .map(({ tutorial, tutorialLink }) => {
                    return `- [${tutorial}](${tutorialLink}?target=_blank)
                    
`;
                })
                .join('')}`;
};

// generate the license section
const generateLicense = (usageArr, projArr) => {
    // if there is no license return an empty string
    if(usageArr[0].license === 'None') {
        return ``;
    }
    
    // if there is a license, create the license file
    createLicense(usageArr[0].license, projArr.userName)

    // create the badge with a link to the license file
    return `---

## License
[![GitHub](https://img.shields.io/github/license/${projArr.userGithub}/${projArr.repoName})](https://github.com/${projArr.userGithub}/${projArr.repoName}/blob/main/LICENSE/?target=_blank) more [details](https://github.com/${projArr.userGithub}/${projArr.repoName}/blob/main/LICENSE/?target=_blank)

This project utilizes the [${usageArr[0].license}](https://github.com/${projArr.userGithub}/${projArr.repoName}/blob/main/LICENSE/?target=_blank).`
};

module.exports = data => {

    // destructure data based on property key names and dump the rest in project
    const { installTrigger, installSteps, usage, collaborators, thirdParty, tutorial, features, tests, ...project } = data;

    return `# ${project.projTitle}
    
[![GitHub](https://img.shields.io/github/license/${project.userGithub}/${project.repoName})](https://github.com/${project.userGithub}/${project.repoName}/blob/main/LICENSE/?target=_blank)
![GitHub Repo stars](https://img.shields.io/github/stars/${project.userGithub}/${project.repoName}?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/${project.userGithub}/${project.repoName}?style=social)
![GitHub repo size](https://img.shields.io/github/repo-size/${project.userGithub}/${project.repoName})
![GitHub language count](https://img.shields.io/github/languages/count/${project.userGithub}/${project.repoName})
![GitHub top language](https://img.shields.io/github/languages/top/${project.userGithub}/${project.repoName})

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/${project.userGithub}/${project.repoName})
![GitHub last commit](https://img.shields.io/github/last-commit/${project.userGithub}/${project.repoName})
![GitHub issues](https://img.shields.io/github/issues-raw/${project.userGithub}/${project.repoName})
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/${project.userGithub}/${project.repoName})
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/${project.userGithub}/${project.repoName})

## Description
${project.projDescription}  

---
## Table of Contents

${tableOfContents(installTrigger, features, usage, tests)}

${generateInstall(installTrigger, installSteps)}

---
## Usage 
${generateUsage (usage)}

${usage[0].instructions}

${generateFeatures(features)}

---
## Contributing
![GitHub contributors](https://img.shields.io/github/contributors/${project.userGithub}/${project.repoName})

${generateContribute(usage, project)}

---
## Questions

- [Request a new feature](mailto:${project.userEmail}?subject=Feature%20request%20for%20${project.repoName})
- [Upvote popular feature requests](https://github.com/${project.userGithub}/${project.repoName}/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc?target=_blank)
- [File an issue](https://github.com/${project.userGithub}/${project.repoName}/issues/new/?target=_blank)

Also, feel free to contact me directly with questions or feedback about the project
- GitHub Username: [${project.userGithub}](https://github.com/${project.userGithub}?target=_blank)
- Email: [${project.userEmail}](mailto:${project.userEmail}?subject=Question%20about%20${project.repoName})

${generateTests(tests)}

---
## Credits
Made with ❤️ by [${project.userName}](https://github.com/${project.userGithub}/?target=_blank)${generateCollabCredits(collaborators)}

${generateThirdPartyCredits(thirdParty)}

${generateTutorialCredits(tutorial)}

${generateLicense(usage, project)}

### ©️${new Date().getFullYear()} ${project.userName}

`;
};