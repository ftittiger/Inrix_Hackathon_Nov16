import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

load_dotenv(override=True)

# Put your AWS credentials in a .env file
access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

client = boto3.client(
    service_name="bedrock-runtime",
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    region_name="us-west-2",
)

# The model ID for the model you want to use
model_id = "anthropic.claude-3-sonnet-20240229-v1:0"
image_file_path = "C:/Users/EEE/INRIX HackaThon/aws-access-24/food1.png"
with open(image_file_path, "rb") as image_file:
    image_bytes = image_file.read()


# The message you want to send to the model
message_list = []

image_message = {
    "role": "user",
    "content": [
        {"text": "Image 1:"},
        {
            "image": {
                "format": "webp",
                "source": {
                    "bytes": image_bytes  # No base64 encoding required
                }
            }
        },
        {"text": "Please estimate the calories from the food in the image"}
    ],
}

message_list.append(image_message)

response = client.converse(
    modelId="anthropic.claude-3-sonnet-20240229-v1:0",
    messages=message_list,
    inferenceConfig={
        "maxTokens": 2000,
        "temperature": 0
    },
)

response_message = response['output']['message']["content"][0]["text"]

print(response_message)
