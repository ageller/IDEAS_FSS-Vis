import pandas as pd
import numpy as np
import os, sys
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
from ipywidgets import interactive, HBox, VBox

import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output




all_files= '.'#"files' location" #folder where you have downloaded the text files 
                             #must be in the same directory as the collapse_dash.py script
data = []


time_col = 0
for file in sorted(os.listdir(all_files)):
    if file.endswith(".r.bt"):
        df = pd.read_csv(file, delim_whitespace = True, names=('orig ID', 'ID', 'mass (M_sol)', 'radius (AU)', 'x (AU)', 'y (AU)', 'z (AU)', 'vx (2pi*AU/yr)', 'vy (2pi*AU/yr)', 'vz (2pi*AU/yr)', 'sx', 'sy', 'sz', 'color'))

        time_col =  time_col + 1E6
        df.insert(loc=0, column = 'Timestep', value=time_col)


        df['radial distance (AU)'] = np.power((df['x (AU)']**2)+(df['y (AU)']**2)+(df['z (AU)']**2),0.5)
        df['theta (radians)'] = np.arctan(df['y (AU)']/df['x (AU)'])
        df['phi (radians)'] = np.arccos(df['z (AU)']/df['radial distance (AU)'])


        data.append(df)



alldata_df = pd.concat(data, ignore_index=True)
#with pd.option_context('display.max_rows', None, 'display.max_columns', None):
    #print(alldata_df)

x_min = float(alldata_df['x (AU)'].min()); x_max = float(alldata_df['x (AU)'].max())
y_min = float(alldata_df['y (AU)'].min()); y_max = float(alldata_df['y (AU)'].max())
z_min = float(alldata_df['z (AU)'].min()); z_max = float(alldata_df['z (AU)'].max())






col_headers = [dict(label=x, value=x) for x in alldata_df]
dimensions = ["color"]



app = dash.Dash(
    __name__, external_stylesheets=["https://codepen.io/chriddyp/pen/bWLwgP.css"]
)


app.layout = html.Div([
        html.H1("Gravitational Collapse"),
        html.Div(
                [html.P([dat + ":", dcc.Dropdown(id=dat, options=col_headers)]) for dat in dimensions],
                style={"width": "22%", "float": "left"},
                ),

        dcc.Graph(id = 'graph', 
                    style = {"width": "78%", "display": "inline-block"}, 
                    ),


    html.Div([
        html.Div([
            html.Div([
                dcc.Graph(
                    id='radial',
                    figure = px.histogram(df, 
                                            x="radial distance (AU)",
                                            title='Radial Distance',
                                            opacity=0.8,
                                            color_discrete_sequence=['crimson'],
                                            width = 650,
                                            height = 450
                                        )
                        )
                    ], 
                    style={
                            "height": "100vh",
                            "width": "30vw",
                            "float": "left",
                            'display': 'inline-block'
                        }, 
                    className="three columns"),
    
            html.Div([
                dcc.Graph(
                    id='azimuthal',
                    figure = px.histogram(df, 
                                            x="phi (radians)",
                                            title='Azimuthal Angle',
                                            opacity=0.8,
                                            color_discrete_sequence=['coral'], 
                                            width = 650,
                                            height = 450
                                        )
                        )
                    ], 
                    style={
                            "height": "100vh",
                            "width": "30vw",
                            "float": "left",
                            'display': 'inline-block'
                        }, 
                    className="three columns"),
            
            html.Div([
                dcc.Graph(
                    id='polar',
                    figure = px.histogram(df, 
                                            x="theta (radians)",
                                            title='Polar Angle',
                                            opacity=0.8,
                                            color_discrete_sequence=['slateblue'],
                                            width = 650,
                                            height = 450
                                        )
                        )
                    ], 
                    style={
                            "height": "100vh",
                            "width": "30vw",
                            "float": "left",
                            'display': 'inline-block'
                        },
                    className="three columns")
            ])
        ], className="row")
    ])



@app.callback(Output("graph", "figure"), [Input(d, "value") for d in dimensions])
def collapse(color):
    return px.scatter_3d(alldata_df, x = 'x (AU)', y = 'y (AU)', z = 'z (AU)', 
                          title='Particle Distribution', 
                          animation_frame="Timestep",
                          hover_data=['mass (M_sol)','vx (2pi*AU/yr)','vy (2pi*AU/yr)','vz (2pi*AU/yr)'],
                          hover_name = 'ID',
                          size = 'radius (AU)', 
                          color = color,
                          color_continuous_scale='Plasma',
                          opacity = 1,
                          width = 1250,
                          height = 750,
                          range_x = [x_min, x_max],
                          range_y = [y_min, y_max],
                          range_z = [z_min, z_max]).update_layout(
                                                            scene = dict(
                                                                       xaxis = dict(
                                                                                   showexponent = 'all',
                                                                                   exponentformat = 'e'),
                                                                       xaxis_title ='x (AU)',
                                                                       yaxis = dict(
                                                                                   showexponent = 'all',
                                                                                   exponentformat = 'e'),
                                                                       yaxis_title ='y (AU)',
                                                                       zaxis = dict(
                                                                                   showexponent = 'all',
                                                                                   exponentformat = 'e'),
                                                                       zaxis_title ='z (AU)'),
                                                            updatemenus=[
                                                                  go.layout.Updatemenu(
                                                                              type = "buttons",
                                                                              direction = "left",
                                                                              buttons=list([
                                                                                          dict(
                                                                                              args=[None, {'frame': {'duration': 25, 'redraw': True}}],
                                                                                              method="animate"
                                                                                              )
                                                                                          ])
                                                                                  )
                                                                          ]
                                                            )


if __name__ == '__main__':    #NEW  
    app.run_server(debug=True)
