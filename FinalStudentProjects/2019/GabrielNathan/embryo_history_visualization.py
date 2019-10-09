import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import numpy as np
import plotly.graph_objs as go

# Import Dash dependencies and external css style sheet
app = dash.Dash()
external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

# Embryo History dataframe
master_df=pd.read_csv('master_merged.csv')
master_df.columns=['sim','name','exFeO','exSi','heliocentric_origin','mxFeO','mxSi','projectile_#','projectile_mass','target_#','target_mass','time','projectile_mass_ratio','mass_accumulated']

# Available indicators from Embryo History
simulation_list=list(master_df.sim.unique())
master_df_available_indicators=list(master_df.columns.values)[2:]

# Subset available indicators for use in Embryo History 
mars_available_indicators=['heliocentric_origin', 'mxFeO', 'mxSi', 'projectile_#', 'projectile_mass', 'target_#', 'target_mass', 'time', 'projectile_mass_ratio', 'mass_accumulated']
earth_available_indicators=['exFeO', 'exSi', 'heliocentric_origin', 'projectile_#', 'projectile_mass', 'target_#', 'target_mass', 'time', 'projectile_mass_ratio', 'mass_accumulated']

# Mantle History dataframe
master_mantle_df=pd.read_csv('merged_mantle.csv')
master_mantle_df.columns=['sim','name','Time','Mass','Al2O3','MgO','CaO','Na','FeO','SiO2']

# Generate html-esque layout of page
app.layout = html.Div([
    # Display page title
    html.Div([
        html.Div('Earth and Mars Grand Tack Accretion Histories', style={'text-align':'center','color': 'blue', 'fontSize': 24}),
    ], style={'marginBottom': 25, 'marginTop': 25}),
    
    #Dropdown menu for simulation choice
    html.Div([ 
            html.Div('Choose Simulation', style={'text-align':'left','color': 'black', 'fontSize': 18}),
            dcc.Dropdown(
                id='simulation_choice',
                options=[{'label': i, 'value': i} for i in simulation_list],
                value=simulation_list[1],
            ),
        ], 
        style={'width': '100%', 'display': 'inline-block','borderBottom': 'thin lightgrey solid',
            'backgroundColor': 'rgb(250, 250, 250)',
            'padding': '10px 5px'}),
    
    #Dropdown menu for plot type
    html.Div([ 
            html.Div('Choose Plot Type', style={'text-align':'left','color': 'black', 'fontSize': 18}),
            dcc.RadioItems(
                id='plot-type',
                options=[{'label': i, 'value': i} for i in ['Line','Scatter']],
                value='Line',
                labelStyle={'display': 'inline-block'}
            ),
        ],
        style={'width': '100%', 'display': 'inline-block','borderBottom': 'thin lightgrey solid',
            'backgroundColor': 'rgb(250, 250, 250)',
            'padding': '10px 5px'}),
    
    #Menu to toggle inputs
    html.Div([ 
        
        #Dropdown menu for x-axis
        html.Div([ 
            html.Div('X-axis controls', style={'text-align':'left','color': 'black', 'fontSize': 18}),
            dcc.Dropdown(
                id='embryo-xaxis-column',
                options=[{'label': i, 'value': i} for i in master_df_available_indicators],
                value='heliocentric_origin',
            ),
            
            #Log/Linear toggle for x-axis
            dcc.RadioItems( 
                id='embryo-xaxis-type',
                options=[{'label': i, 'value': i} for i in ['Linear', 'Log']],
                value='Linear',
                labelStyle={'display': 'inline-block'}
            )
        ],
            style={'width': '33%', 'display': 'inline-block'}),
        
        # y1-axis controls EARTH dataframe y vals
        html.Div([  
            html.Div('Y1 (display Earth values)', style={'text-align':'left','color': 'black', 'fontSize': 18}),
            # Dropdown menu for y-axis
            dcc.Dropdown(
                id='embryo-yaxis-column',
                options=[{'label': i, 'value': i} for i in earth_available_indicators],
                value='exFeO'
            ),
            #Log/Linear toggle for y-axis
            dcc.RadioItems( 
                id='embryo-yaxis-type',
                options=[{'label': i, 'value': i} for i in ['Linear', 'Log']],
                value='Linear',
                labelStyle={'display': 'inline-block'}
            )
        ], 
            style={'width': '34%',  'display': 'inline-block'}),
        # y2-axis controls MARS dataframe y vals 
        html.Div([ 
            html.Div('Y2 (display Mars values)', style={'text-align':'left','color': 'black', 'fontSize': 18}),
            # Dropdown menu for y-axis
            dcc.Dropdown( 
                id='embryo-y2axis-column',
                options=[{'label': i, 'value': i} for i in mars_available_indicators],
                value='mxFeO'
            ),
        ], 
            style={'width': '33%', 'float': 'right', 'display': 'inline-block'})
    ], style={
            'borderBottom': 'thin lightgrey solid',
            'backgroundColor': 'rgb(250, 250, 250)',
            'padding': '10px 5px'
    }),
    
    # Dropdown menu for mantle history choice
    html.Div([ 
            html.Div('Mantle History Display', 
                style={'text-align':'left','color': 'black', 'fontSize': 18}),
            dcc.Dropdown(
                id='earth_mars_mantle_choice',
                options=[{'label': i, 'value': i} for i in ['Earth','Mars']],
                value='Earth',
            ),
        ],
        style={'width': '100%', 'display': 'inline-block','borderBottom': 'thin lightgrey solid',
            'backgroundColor': 'rgb(250, 250, 250)',
            'padding': '10px 5px'}),
    
    # Two Plots at bottom of page
    html.Div([ 
        
        # Left plot (Embryo History)
        html.Div([
        dcc.Graph(
            id='embryo-graph',
            )
        ], 
        style={'width': '49%', 'display': 'inline-block', 'padding': '0 20'}),
        
        # Right plot (Mantle Evolution)
        html.Div([
        dcc.Graph(
            id='mantle-graph',

            )
        ],
        style={'width': '49%', 'display': 'inline-block', 'padding': '0 20'}),
    ])
    ])

# Callback for Embryo History Graph
@app.callback(
    dash.dependencies.Output('embryo-graph', 'figure'),
    [dash.dependencies.Input('embryo-xaxis-column', 'value'),
     dash.dependencies.Input('embryo-yaxis-column', 'value'),
     dash.dependencies.Input('embryo-y2axis-column', 'value'),
     dash.dependencies.Input('embryo-xaxis-type', 'value'),
     dash.dependencies.Input('embryo-yaxis-type', 'value'),
     dash.dependencies.Input('simulation_choice', 'value'),
     dash.dependencies.Input('plot-type', 'value')
    ])
# Function to generate Embryo History Graph
def update_graph(xaxis_column_name,yaxis_column_name,
        y2axis_column_name,xaxis_type,
        yaxis_type,sim_name,plot_type):
        a=master_df.loc[master_df['sim']==sim_name]
        mars_df=a.loc[a['name']=='mars']
        earth_df=a.loc[a['name']=='earth']
        # Earth Values data
        trace1 = go.Scattergl(
            x=earth_df[xaxis_column_name], 
            y=earth_df[yaxis_column_name],
            mode='markers' if plot_type=='Scatter' else 'lines', 
            marker={"size": 3.5},
            marker_color='rgb(12, 6, 202)',
            name="Earth")
        # Mars Values data
        trace2 = go.Scattergl(
            x=mars_df[xaxis_column_name], 
            y=mars_df[y2axis_column_name], 
            mode='markers' if plot_type=='Scatter' else 'lines', 
            marker={"size": 3.5},
            marker_color='rgb(181, 22, 22)',
            name="Mars")
        # List Earth and Mars data to send to "data"
        data = [trace1, trace2]
        return {
            "data": data,
            "layout": go.Layout(
                    title={'text': 'Embryo History: Best Fit Oxidation Gradient' if yaxis_column_name=='exFeO' else 'Embryo History'},
                    xaxis={
                        'title': 'heliocentric distance (AU)' if xaxis_column_name == 'heliocentric_origin' else xaxis_column_name,
                        'type': 'linear' if xaxis_type == 'Linear' else 'log'
                    },
                    yaxis={
                        'title': 'frac Fe in metal' if yaxis_column_name=='exFeO' else yaxis_column_name,
                        'type': 'linear' if yaxis_type == 'Linear' else 'log'
                    },
                    margin={'l': 40, 'b': 40, 't': 70, 'r': 10},
                    height=450,
                    hovermode='closest'
            )
    }

#Callback for Mantle Composition Graph
@app.callback( 
    dash.dependencies.Output('mantle-graph', 'figure'),
    [dash.dependencies.Input('earth_mars_mantle_choice', 'value'),
     dash.dependencies.Input('simulation_choice', 'value')
    ])
#Function to generate Mantle Composition Graph
def mantle_graph(mantle_hist_name,sim_name):
    sub_mantle_df=master_mantle_df.loc[master_mantle_df['sim']==sim_name]
    mars_mantle_df=sub_mantle_df.loc[sub_mantle_df['name']=='mars']
    earth_mantle_df=sub_mantle_df.loc[sub_mantle_df['name']=='earth']
    
    # Display Mars embryo mantle history 
    if mantle_hist_name=='Mars':
        return {
            'data': [
                #{'x': mantle_df['Time'], 'y': mantle_df['Mass'], 'type': 'line', 'name': 'Total Mass'},
                {'x': mars_mantle_df['Time'], 'y': mars_mantle_df['Al2O3'], 'type': 'line', 'name': u'Al2O3'},
                {'x': mars_mantle_df['Time'], 'y': mars_mantle_df['MgO'], 'type': 'line', 'name': u'MgO'},
                {'x': mars_mantle_df['Time'], 'y': mars_mantle_df['CaO'], 'type': 'line', 'name': u'CaO'},
                {'x': mars_mantle_df['Time'], 'y': mars_mantle_df['Na'], 'type': 'line', 'name': u'Na'},
                {'x': mars_mantle_df['Time'], 'y': mars_mantle_df['FeO'], 'type': 'line', 'name': u'FeO'},
                {'x': mars_mantle_df['Time'], 'y': mars_mantle_df['SiO2'], 'type': 'line', 'name': u'SiO2'},
                ],
            
            'layout': go.Layout(
                title={'text':'Mars Mantle Composition'},
                xaxis={
                    'title': 'Time',
                    'type': 'linear'
                },
                yaxis={
                    'title': 'Weight %',
                    'type': 'linear'
                },
                margin={'l': 40, 'b': 40, 't': 70, 'r': 10},
                height=450,
                )
            }
    # Else display Earth embryo mantle history 
    else: 
        return {
            'data': [
                #{'x': mantle_df['Time'], 'y': mantle_df['Mass'], 'type': 'line', 'name': 'Total Mass'},
                {'x': earth_mantle_df['Time'], 'y': earth_mantle_df['Al2O3'], 'type': 'line', 'name': u'Al2O3'},
                {'x': earth_mantle_df['Time'], 'y': earth_mantle_df['MgO'], 'type': 'line', 'name': u'MgO'},
                {'x': earth_mantle_df['Time'], 'y': earth_mantle_df['CaO'], 'type': 'line', 'name': u'CaO'},
                {'x': earth_mantle_df['Time'], 'y': earth_mantle_df['Na'], 'type': 'line', 'name': u'Na'},
                {'x': earth_mantle_df['Time'], 'y': earth_mantle_df['FeO'], 'type': 'line', 'name': u'FeO'},
                {'x': earth_mantle_df['Time'], 'y': earth_mantle_df['SiO2'], 'type': 'line', 'name': u'SiO2'},
                ],
            'layout': go.Layout(
                title={'text':'Earth Mantle Composition'},
                xaxis={
                    'title': 'Time',
                    'type': 'linear'
                },
                yaxis={
                    'title': 'Weight %',
                    'type': 'linear'
                },
                margin={'l': 40, 'b': 40, 't': 70, 'r': 10},
                height=450,
                )
    }

# Run server. Debug=True allows for live updates of page if code is altered
if __name__ == '__main__':
    app.run_server(debug=True)