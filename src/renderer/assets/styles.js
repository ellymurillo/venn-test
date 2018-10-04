import styled from 'vue-styled-components'

const searchIcon = require('@/assets/imgs/search.png')
const dbIcon = require('@/assets/imgs/db.png')
const folder = require('@/assets/imgs/folder.png')
const folderSolid = require('@/assets/imgs/folder-solid.png')

const highLight = '#f5f5f5'
const btnBG = '#6299ab'

export const Wrapper = styled.div`
    background: #fff;
    font-size: 12px;
    color: #777;
    font-family: Arial
    position: relative;
`

export const Header = styled.header`
    background: #fdfdfd;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 20px;
`

export const Btn = styled.button`
    background: ${btnBG};
    border-radius: 4px;
    -webkit-border-raduis: 4px;
    border: 0;
    color: #fff;
    padding: 6px 10px;
    cursor: pointer;
    margin-right: 5px;

    &:focus,
    &:active {
        outline: none;
    }
`
export const Search = styled.input`
    border: 0;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    position: relative;
    max-width: 200px;
    padding: 6px 10px;
    box-sizing: border-box;
    width: 100%;
    background: url(${searchIcon}) no-repeat center right 10px / 15px 15px #fbfbfb;

    &.float-right {
        float: right;
    }
`

export const Aside = styled.aside`
    width: 20%;
    float: left;
    box-sizing: border-box;
    padding: 10px 20px;
`

export const Main = styled.main`
    width: 80%;
    float: left;
    box-sizing: border-box;
    padding: 10px 20px 0 0;
`

export const Icon = styled.i`
    font-style: normal;
    font-weight: 700;
    margin: 5px 0 0;
    padding: 5px 0;
    display: block;
    cursor: pointer;
    color: #000;

    &:hover,
    &:active {
        background: ${highLight};
    }
    
    &:before {
        content: "";
        width: 12px;
        height: 15px;
        display: inline-block;
        vertical-align: middle;
        background: url(${dbIcon}) no-repeat center center;
        margin-right: 6px;
     }
`

export const SideListing = styled.ul`
    height: 150px;
    overflow-y: auto;
    padding: 0;
    margin: 0;

    li {
        list-style: none;
        line-height: 1;

        a {
            display: block;
            padding: 5px 0 5px 20px;
            cursor: pointer;

            &:hover,
            &:active,
            &:focus {
                background: ${highLight};
            }
       
            &:before {
                content: "";
                width: 18px;
                height: 15px;
                display: inline-block;
                vertical-align: middle;
                background: url(${folder}) no-repeat center center;
                margin-right: 3px;
            }
        }
    }
`

export const hRule = styled.hr`
    border-top: 2px solid #f9f9f9;
    padding-bottom: 5px;
    position: relative;

    &:after {
        content: "";
        display: block;
        width: 40%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-top: 1px solid #f9f9f9;
    }
`

export const DataTable = styled.table`

    thead {
        tr {
            &:hover {
                background: none;
            }

            &:first-child {
                background: ${highLight};

                td,
                td:first-child {
                    padding-left: 10px;
                    text-transform: uppercase;
                }
            }

            td {
                &.with-actions {
                    padding-left: 40px;
                    padding-bottom: 10px;
                }

                color: #000;
                font-weight: 600;
            }
        }
    }

    tr {
        cursor: pointer;
        
        &:hover {
            background: ${highLight};

            div {
                visibility: visible;
            }
        }

        div {
            visibility: hidden;
            position: absolute;
        }

        a {
            font-size: 10px;
            margin: 0 2px;

            &:first-child,
            &:first-child:hover {
                color: ${btnBG}
            }

            &:last-child,
            &:last-child:hover {
                color: #e36969;
            }
        }

        td {
            position: relative;

            &.with-actions {
                padding-left: 40px;
                padding-bottom: 32px;
            }

            [type="checkbox"] {
                position: absolute;
                left: 20px;
                margin-top: 3px;
            }

            padding: 10px 14px;
            border-bottom: 1px solid ${highLight};
        }
    }
`