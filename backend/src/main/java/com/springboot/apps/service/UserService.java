package com.springboot.apps.service;

import com.springboot.apps.dto.UserRegisterDTO;
import com.springboot.apps.entity.User;

public interface UserService {
	public User registerUser(UserRegisterDTO userRegisterDTO);
}
