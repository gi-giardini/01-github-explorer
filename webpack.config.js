/**
 * O webpack serve para gerenciar quais arquivos deverão ser "traduzidos" de forma que o browser consiga ler
*/ 

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

/** Variável para alternar ambientes de desenvolvimento e produção */
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    
    /**
     * Serve para que possa visualizar as referências (como erro na linha x)
     * no arquivo original e não no bundle.js
    */
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', 

    /**Mostra qual o arquivo inicial (index.tsx)*/
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    
    /**Serve para dizer qual arquivo será gerado com o webpack, no caso o bundle em dist (o tradutor)*/
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    /*Diz que haverá arquivos .js e .jsx. Ambos devem funcionar na aplicação*/
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    /** 
     * Para que o webpack observe as mudanças automaticamente, sem que precise executar yarn webpack toda vez
     * Instala com yarn add webpack-dev-server -D
    */
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'public'),
        },
        //compress: true,
        //port: 8080,
        hot: true
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'public'),
    // },

    /** 
     * Para melhorar o fluxo da aplicação. Vai referenciar o arquivo de tradução do babel,
     * mesmo que o nome do arquivo mude. Cria um novo index.html em dist
     * Instala com yarn add html-webpack-plugin -D
    */ 
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    /**Esse filter serve para não parar o código quando o plugin for falso */
    module: {
        rules: [
            {
                /**Recebe uma expressão regular para dizer se o arquivo é jsx ou tsx*/
                test: /\.(j|t)sx$/,
                /**Exclui todos os arquivos de node_modules, pois já está pronto para o browser ler*/
                exclude: /node_modules/,
                /**
                 * Integração entre babel e webpack
                 * Instala com yarn add babel-loader -D
                */ 
                use: {
                    loader: 'babel-loader',
                    options: {
                        /**
                         * Plugin para não dar refresh na página em toda alteração, para evitar perda de dados
                         * Instala com yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
                        */
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
               /**Recebe uma expressão regular para conseguir ler arquivo css*/
               test: /\.scss$/,
               /**Exclui todos os arquivos de node_modules, pois já está pronto para o browser ler*/
               exclude: /node_modules/,
               /**
                * Integração entre babel e webpack
                * Instala com yarn add babel-loader -D
               */ 
               use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}