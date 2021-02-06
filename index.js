// Packages needed for this application
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
// const questions = [];
const promptProject = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is your projects title? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('At a minimum, your project README needs a title.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a project description explaining the what, why, and how. (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('At a minimum, your project README needs a description.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmInstall',
        message: 'Do you need to include the steps required to install your project?',
        default: true
      },
    {
        type: 'input',
        name: 'install',
        message: 'Provide some information about yourself:',
        when: ({ confirmInstall }) => {
            if (confirmInstall) {
              return true;
            } else {
              return false;
            }
        }
    }
  ]);
};

const promptInstall = installData => {
    // If there is no 'projects' array property, create one
    if (!installData.steps) {
        installData.steps = [];
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
        installData.steps.push(stepData);
        // check if they want to add another project
        if (stepData.confirmAddStep) {
            // if so, call the function again passing the array back through the function
            return promptInstall(installData);
        } else {
            // return the array
            return installData;
        }
    });
}

// TODO: Create a function to write README file
// TODO: Auto-Generate a Table of Contents. No need to ask.
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    promptProject()
    .then(promptInstall)
}

// Function call to initialize app
init();
