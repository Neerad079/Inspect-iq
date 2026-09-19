package com.smartinspect.service;

import com.smartinspect.dto.request.LoginRequest;
import com.smartinspect.dto.response.LoginResponse;
import com.smartinspect.exception.UnauthorizedException;
import com.smartinspect.model.User;
import com.smartinspect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
