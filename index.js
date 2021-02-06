// Packages needed for this application
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
// const questions = [];
const promptUser = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'userName',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Your name is required.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'userGithub',
        message: 'What is your GitHub Username? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Your GitHub username is required');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repoName',
        message: `What is your project's GitHub repository name? (Required)`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log(`Your project's GitHub repository name is required`);
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'projTitle',
        message: `What is your project's title? (Required)`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log(`At a minimum, your project's README needs a title...`);
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'projDescription',
        message: 'Enter a project description explaining the what, why, and how. (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log(`At a minimum, your project's README needs a description...`);
                return false;
            }
        }
    }
  ]);
};

const promptInstall = readmeData => {
    // If there is no 'readmeData' array property, create one
    if (!readmeData.installSteps) {
        readmeData.installSteps = [];
        stepNum = 0;
    }
    stepNum++;
    console.log(`
        ====================
        Installation Step ${stepNum}
        ====================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: `What is the title of step ${stepNum} in the installation of your project? `,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter an installation step title');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: `Provide a detailed description of step ${stepNum}`,
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'optional',
            message: 'Is this an optional step?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddStep',
            message: 'Is there another step needed for installation?',
            default: false
        },
    ])
    .then(stepData => {
        // push data into the array
        readmeData.installSteps.push(stepData);
        // check if they want to add another step
        if (stepData.confirmAddStep) {
            // if so, call the function again passing the array back through the function
            return promptInstall(readmeData);
        } else {
            // return the array
            return readmeData;
        }
    });
}

const promptUsage = readmeData => {
    if (!readmeData.usage) {
        readmeData.usage = [];
    }

    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmLink',
            message: 'Do you have a deployed link?',
            default: false
          },
          {
            type: 'input',
            name: 'usageLink',
            message: 'Enter link to deployed application: ',
            when: ({ confirmLink }) => {
                if (confirmLink) {
                  return true;
                } else {
                  return false;
                }
            }
        },
    ])
    .then(usageData => {
        readmeData.usage.push(usageData);
        return readmeData;
    });
}

const promptCredits = readmeData => {
    return inquirer.prompt([
    {
        type: 'confirm',
        name: 'confirmCredits',
        message: 'Do you need to recognize collaborators for your project?',
        default: false,
        when: ({ confirmCredits }) => {
            if (confirmCredits) {
              return false;
            } else {
              return true;
            }
        }
      },
    {
        type: 'input',
        name: 'collaborator',
        message: 'Collaborator name: ',
        when: ({ confirmCredits }) => {
            if (confirmCredits) {
              return true;
            } else {
              return false;
            }
        }
    },
    {
        type: 'input',
        name: 'collabGitHub',
        message: 'Colaborator GitHub profile link: ',
        when: ({ confirmCredits }) => {
            if (confirmCredits) {
              return true;
            } else {
              return false;
            }
        }
    }
  ]);
};

// TODO: Create a function to write README file
// TODO: Auto-Generate a Table of Contents. No need to ask.
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    promptUser()
    .then(promptInstall)
    .then(promptUsage)
    .then(readmeData => console.log(readmeData))
    //.then(promptCredits)
    //.then(answers => console.log(answers));
}

// Function call to initialize app
init();
