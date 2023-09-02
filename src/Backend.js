import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const backendApiPath = 'http://localhost:5001/api/'
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded',
    // Other headers you want to include
};

async function Post(path) {
    {
        const callPath = backendApiPath + path
        try {
            const response = await axios.post(callPath, null, {
                headers: headers,
                withCredentials: true
            });
            console.log('Response Data:', response);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export default Post