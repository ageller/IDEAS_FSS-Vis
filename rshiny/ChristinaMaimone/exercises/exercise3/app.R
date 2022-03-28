# EXERCISE 3A

# Run the application.
# Laptop users: Copy the URL from upper left and open two web browser tabs or windows with this URL.
# Cloud users: Find a partner who is running from their laptop. 
# Hint: sample() chooses a random sample from a supplied vector.
# 
# - Which values should be the same in the two sessions?  Why?
# - Which values should change during a session?  Why?
# - Should any of the values be the same as your neighbors?
# - What happens if you refresh the page/tab?
# - What happens if you delete the number from the number input field? Or enter text? Or a negative number?


# EXERCISE 3B

# Add req() and/or validate() statements to verify the numeric input for output$letters
# Change the code so that the letter that is displayed is chosen randomly for the session, not each time the input changes.
# Run the app again and see how the behavior changes from before


library(shiny)

applicationnumber <- sample(1:2000, 1)

ui <- fluidPage(
  
  titlePanel("What Changes?"),
  
  fluidRow(
    column(width=4, textInput(inputId="usertext", label="Type something")),
    column(width=8, tags$h4(htmlOutput(outputId="usertextoutput")))
  ),
  
  fluidRow(
    column(width=4, 
      numericInput(inputId = "n",
                 label = "Enter a number:",
                 value = 5,
                 min = 1, max = 30, step=1)
    ),
    column(width=8,
           tags$h1(textOutput(outputId="letters")))
  ),
  
  verticalLayout(
      tags$h3("Application"),
      textOutput(outputId="appnum"),

      tags$h3("Session"),
      textOutput(outputId="sessnum")
  )
)

server <- function(input, output) {
  sessionnumber <- sample(3000:30000, 1)
  textcolor <- sample(c("red","orange","green","blue","purple", "pink", "brown", "black"), 1)
  
  output$appnum <- renderText({
    paste("Application Random Number is", applicationnumber)
  })
  
  output$sessnum <- renderText({
    paste("Session Random Number is", sessionnumber)
  })
  
  output$usertextoutput <- renderUI({
    HTML(paste('<font color="',textcolor,'">',input$usertext,'</font>'))
  })
  
  output$letters <- renderText({
    paste(rep(sample(LETTERS, 1), input$n), collapse=' ')
  })
}

shinyApp(ui=ui, server=server)

