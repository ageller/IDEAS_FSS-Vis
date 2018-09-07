# EXERCISE 2A
# Fix the code below so that the app runs and works
# Hint: there are 4 errors

# EXERCISE 2B
# Fill in the code to render a DataTable of the entire data set.
# What is the name of the element on output you need to set? output$_____ 
# Using the cheat sheet, what is the render function for a DataTable that goes with dataTableOutput?
# The only expression you need for the render function is the name of the data object.   
# Hint: what did we call the dataset (data frame object) when importing it at the top of the file?

library(shiny)
library(readr)
library(ggplot2)

data <- read_csv("africadata.csv")

ui <- fluidPage(
  
  titlePanel("Africa: Country Size"),
  
  sidebarLayout(
    sidebarPanel(
      selectInput(inputId = "yval",
                  label = "Y-axis:",
                  choices = c("GDP" = "gdp_2017", "Population" = "pop_2017",
                                 "Railroads" = "rail", "Roads" = "road"),
                  selected = "gdp_2017")
    ),
    
    mainPanel(
      plotOutput("plot1")
    )
  )
  
  verticalLayout(
    DT::dataTableOutput("datatable1") 
  )
)

server <- function(input, output) {
  
  output$plot <- renderPlot({
    # use aes_string below, instead of aes, because input$y is text
    ggplot(data, aes_string(x="area", y=input$y)) + 
      geom_point() + 
      geom_smooth(color="red", method="lm") +
      xlab("Area (sq km)") + 
      theme_minimal()
  })
  
  # code for exercise 2B goes here
}

shinyApp()

