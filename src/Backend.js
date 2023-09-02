import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const backendApiPath = 'http://localhost:5001/api/'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded',
};

/**
 * This function calls backend with POST method, automatically with credentials
 * @param {string} path - Path to call, example: 'users/onlinecheck'.
 * @param {object} data - Data to be sent, example: {username, password}
 * @example
 *  Post('users/onlinecheck').then(responseData => {
      console.log("This is logged when call is completed, responseData contains received data")
    })
    Post('users/login/password', {username, password}).then(responseData => {
      window.location.reload()
      navigate('/shopView')
    })
 */
async function Post(path, data) {
    {
        const callPath = backendApiPath + path
        try {
            const response = await axios.post(callPath, qs.stringify(data), {
                headers: headers,
                withCredentials: true
            });
            console.log('Response Data:', response);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            window.alert(error)
            return false;
        }
    }
}

export async function Put(path, data) {
    {
        const callPath = backendApiPath + path
        try {
            const response = await axios.put(callPath + "/" + data, null, {
                headers: headers,
                withCredentials: true
            });
            console.log('Response Data:', response);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            window.alert(error)
            return false;
        }
    }
}

export async function Get(path) {
    {
        const callPath = backendApiPath + path
        try {
            const response = await axios.get(callPath, {
                headers: headers,
                withCredentials: true
            });
            console.log('Response Data:', response);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            window.alert(error)
            return false;
        }
    }
}

export default Post