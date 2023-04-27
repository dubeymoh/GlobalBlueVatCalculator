
•   How to build and run the code

      -  Visit the main page https://github.com/dubeymoh/GlobalBlueVatCalculator and click on code button.
      -  You can either copy the link(https://github.com/dubeymoh/GlobalBlueVatCalculator.git) for cloning the code or can click on Open with Visual studio button.
      -  The Open with Visual Studio button prompts for an alert where we must click on Open Visual Studio Web Protocol Handler Selector. 
      -  This opens Visual studio and ask for cloning the solution on a folder(we can browse and change the folder if required).
      -  If you have copied the link, open Visual Studio 2019/2022, go to Git Changes/Team explorer and clone the repository by pasting the link.
      -  Alternatively, you can use any other Git cloning tool and follow the same steps.      
      -  Click on view option on menu bar in visual studio and then click on terminal.
      -  In the developer powershell terminal that opens, navigate to ~\GlobalBlue_VAT_Calculator\ClientApp\ folder and type 'npm install' and hit enter. This will install all packages.
      -  Right click on the solution file and click on Build solution button in context menu.
      -  Build completion status will appear in output window.
      -  If build succeeds, press Ctrl+F5 or click on Start without debugging on Debug menu.
      -  A website will open on your default browser on following URL : https://localhost:44322.
      -  The website is up and running and ready for use.


•   Assumptions made while designing the project

    -  The user can select VAT RATE they want to apply for a country. By default, NET amount will be selected.
    -  User can enter only one of the following amount-NET, GROSS, or VAT, other two amounts would be disabled and would get calculated automatically based on selected VatRate . 
    -  Valid NET, GROSS, or VAT amounts examples are-"123", "0.456", ".789", "1.", in short non-zero numbers.  
    -  Following values will not be allowed-"12a", "1.2.3", or "1.23a"because they are not a valid amount. Blanks are also not allowed.

•   Things that could have been done better
 
    - Implementation of a service level design pattern to handle the business complexities in future.
    - Implementation of unit tests on Angular.
    - The amount calculated with decimal places could be rounded off to certain precision.

•   Assessment relevant info

    - The web App is created using .Net 6.
    - Front-End is created with Angular 14.
    - fxLayout and Material UI have been used to make website look prettier and professional.
