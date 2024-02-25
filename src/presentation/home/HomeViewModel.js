import {useState} from "react";

export default function HomeViewModel() {

    const [error, setError] = useState(null);

    return {
        error
    }
}