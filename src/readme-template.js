// create the credits section
const generateCredits = collabData => {
    // filter by confirmConfirm credits and add collaborator info if needed
    return `${collabData.filter(({ confirmCredits }) => confirmCredits)
                .map(({ collaborator, collabGitHub }) => {
                    return ` / [${collaborator}](https://github.com/${collabGitHub})`;
                })
                .join('')}`;
}

// generate installation steps
const generateInstall = stepsArr => {
    let step = 0;
    isOptional = ``;
    return `${stepsArr.map(({ title, description, optional }) => {
                    step++;
                    if (!optional) {
                        isOptional = ``
                    } else {
                        isOptional = ` (*Optinal*)`;
                    }
                    return `- Step ${step}) **${title}**${isOptional} - ${description};
`;
                })
                .join('')}`;
};

module.exports = data => {

    // destructure data based on property key names and dump the rest in project
    const { installSteps, usage, collaborators, features, tests, ...project } = data;

    return `# ${project.projTitle}
![GitHub repo size](https://img.shields.io/github/repo-size/${project.userGithub}/${project.repoName}) 
![GitHub all releases](https://img.shields.io/github/downloads/${project.userGithub}/${project.repoName}/total)
![GitHub issues](https://img.shields.io/github/issues-raw/${project.userGithub}/${project.repoName})
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/${project.userGithub}/${project.repoName})
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/${project.userGithub}/${project.repoName})

## Description

${project.projDescription}  


## Table of Contents

$ {tableOfContents()}

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

${generateInstall(installSteps)}
## Usage 

${usage[0].link}

![screenshot](${usage[0].scrnSht})

${usage[0].instructions}

## Credits
Made with ❤️ by [${project.userName}](https://github.com/${project.userGithub}/)${generateCredits(collaborators)}

### ©️${new Date().getFullYear()} ${project.userName}

## Built With

## License

The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)


---

🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![GitHub followers](https://img.shields.io/github/followers/${project.userGithub}?label=Follow&style=social)

Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.


## Features

If your project has a lot of features, consider adding a heading called "Features" and listing them there.


## Contributing

If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.


## Questions

How to contact me with questions about the project


## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them.

`;
};