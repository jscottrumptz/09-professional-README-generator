// create the credits section
const generateCredits = aboutText => {
    if (!aboutText) {
        return '';
    }

    return `
        <section class="my-3" id="about">
            <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
            <p>${aboutText}</p>
        </section>
    `;
}

// generate installation steps
const generateInstall = stepsArr => {
    return `
        <section class="my-3" id="portfolio">
            <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
            <div class="flex-row justify-space-between">
                ${stepsArr.filter(({ optional }) => optional)
                .map(({ name, description, languages, link }) => {
                    return `
                        <div class="col-12 mb-2 bg-dark text-light p-3">
                            <h3 class="portfolio-item-title text-light">${name}</h3>
                            <h5 class="portfolio-languages">
                                Built With:
                                ${languages.join(', ')}
                            </h5>
                            <p>${description}</p>
                            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                        </div>
                    `;
                })
                .join('')}
        
                ${stepsArr.filter(({ optional }) => !optional)
                .map(({ name, description, languages, link }) => {
                    return `
                        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                            <h3 class="portfolio-item-title text-light">${name}</h3>
                            <h5 class="portfolio-languages">
                                Built With:
                                ${languages.join(', ')}
                            </h5>
                            <p>${description}</p>
                            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                        </div>
                    `;
                })
                .join('')}
            </div>
        </section>
    `;
};

module.exports = data => {

    // destructure data based on property key names and dump the rest in project
    const { installSteps, usage, collaborators, features, tests, ...project } = data;

    return `
# ${project.projTitle}

## Description

![GitHub repo size](https://img.shields.io/github/repo-size/${project.userGithub}/${project.repoName}) 
![GitHub all releases](https://img.shields.io/github/downloads/${project.userGithub}/${project.repoName}/total)
![GitHub issues](https://img.shields.io/github/issues-raw/${project.userGithub}/${project.repoName})
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/${project.userGithub}/${project.repoName})
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/${project.userGithub}/${project.repoName})


${project.projDescription}  


## Table of Contents

$ {tableOfContents()}

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

$ {generateInstall(installSteps)}


## Usage 

${usage[0].link}

![screenshot](${usage[0].scrnSht})

${usage[0].instructions}


## Credits

$ {generateCredits(collaborators)}

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.


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

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them.

    `;
};