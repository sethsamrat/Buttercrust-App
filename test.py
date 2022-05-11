import requests as re

host = "http://43.204.112.104:8000"

def test_get_api(api_url, params, code=200):
    api_url = host + api_url
    response = re.get(api_url, params)
    assert response.status_code == code

def test_post_api(api_url, params, code = 200):
    api_url = host + api_url
    response = re.post(api_url, json=params)
    assert response.status_code == code


get_urls = ["/api/pizzas/getallpizzas","/api/pizzas/getpizzabyid"]

def test(test_apis):
    for item in test_apis:
        api, method, params = item
        if method == "post":
            test_post_api(api, params)
        else:
            test_get_api(api, params)

test_apis = [("/api/pizzas/getallpizzas", "get", {}),("/api/pizzas/getpizzabyid", "post", {"pizzaid" : "6253b02c0f62ae566cd5a9a4"})]
test(test_apis)
