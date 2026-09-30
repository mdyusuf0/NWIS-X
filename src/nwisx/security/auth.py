from fastapi import Header, HTTPException

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != "secret":
        raise HTTPException(status_code=401, detail="Invalid API Key")
    return x_api_key
