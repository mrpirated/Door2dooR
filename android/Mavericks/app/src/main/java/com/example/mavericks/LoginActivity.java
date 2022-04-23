package com.example.mavericks;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.view.menu.ActionMenuItemView;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;
import java.nio.charset.StandardCharsets;
import java.text.Collator;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
public class LoginActivity extends AppCompatActivity {
   EditText password,email,er;


    private static final String url = "jdbc:mysql://172.104.206.37:3306/manymavericks";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        email=findViewById(R.id.Email);
        password=findViewById(R.id.Password);
        er=findViewById(R.id.error);
        String user ="devMM";
        String datapass="Hum@first1";
        Button login=findViewById(R.id.login);
        Log.d("src","login page");
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String em=email.getText().toString().trim();
                String pass=password.getText().toString().trim();
                if(TextUtils.isEmpty(em))
                {
                    email.setError("Enter Phone");
                    email.requestFocus();

                }
                if(TextUtils.isEmpty(pass))
                {
                    password.setError("Enter Password");
                    password.requestFocus();
                }
               // String url = "http://127.0.0.1:6875/api/login";
                HashMap<String, String> params = new HashMap<String, String>();
                params.put("type", "user");
                params.put("email",em);
                params.put("password",pass);
                JSONObject con =new JSONObject(params);

//                JsonObjectRequest request_json = new JsonObjectRequest(Request.Method.POST,url, con,
//                        new Response.Listener<JSONObject>() {
//                            @Override
//                            public void onResponse(JSONObject response) {
//                                Log.d("res",response.toString());
//                                er.setText(response.toString());
//
//                            }
//                        }, new Response.ErrorListener() {
//                    @Override
//                    public void onErrorResponse(VolleyError error) {
//                        VolleyLog.e("Error: ", error.getMessage());
//                        Log.d("error",error.getMessage().toString());
//                        Log.e("error",error.getMessage().toString());
//                        er.setText(error.getMessage().toString());
//
//                    }
//                });
                String url2="https://www.google.com/";
                        StringRequest stringRequest
                        = new StringRequest(
                        Request.Method.GET,
                        url2,
                        new Response.Listener() {
                            @Override
                            public void onResponse(Object response) {
                                er.setText(response.toString());

                            }


                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error)
                            {
                                er.setError(error.toString());
                            }
                        });
                requestQueue.add(stringRequest);

            //  requestQueue.add(request_json);

    }
    });
    }
}